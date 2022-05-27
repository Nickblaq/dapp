// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Holdings is Ownable, ReentrancyGuard {

    using SafeMath for uint;
    // using IERC20 for BUSD;


     IERC20 public BUSD;
    // using IERC20 for BUSD;

    // IERC20 public poolToken;
     IERC20 public poolToken;

     //total amount of staked BUSD
    uint public totalStaked;

    //tax rate for staking in percentage
    uint public referralTaxRate;

     //minimum stakeable BUSD 
    uint public minimumStakeValue;

     //pause mechanism
    bool public active = true;
    uint public stakingTaxRate;
    // uint public registrationTax;
    uint public dailyROI;
    uint public rewardAPY;

    //mapping of stakeholder's addresses to data
    mapping(address => uint) public stakes;
    mapping(address => uint) public referralRewards;
    mapping(address => uint) public referralCount;
    mapping(address => uint) public stakeRewards;
    mapping(address => uint) private lastClock;
    mapping(address => bool) public registered;


    //Events
    event OnWithdrawal(address sender, uint amount);
    event OnPoolTOkenPayout(address sender, uint amount);
    event OnStake(address sender, uint amount);
    event OnUnstake(address sender, uint amount);
    event OnRegisterAndStake(address stakeholder, uint amount, uint totalTax , address _referrer);

     constructor(
        IERC20 _token,
        uint _stakingTaxRate, 
        uint _dailyROI,
        IERC20 _poolToken,
        uint _rewardAPY,
        uint _minimumStakeValue
        ) 
        public {
        BUSD = _token;
        stakingTaxRate = _stakingTaxRate;
        dailyROI = _dailyROI;
        rewardAPY = _rewardAPY;
        minimumStakeValue = _minimumStakeValue;
        poolToken = _poolToken;
    }


    //exclusive access for registered address
    modifier onlyRegistered() {
        require(registered[msg.sender] == true, "Stakeholder must be registered");
        _;
    }
    
    //exclusive access for unregistered address
    modifier onlyUnregistered() {
        require(registered[msg.sender] == false, "Stakeholder is already registered");
        _;
    }
        
    //make sure contract is active
    modifier whenActive() {
        require(active == true, "Smart contract is curently inactive");
        _;
    }

     //used to pause/start the contract's functionalities
    function changeActiveStatus() external onlyOwner() {
        if(active) {
            active = false;
        } else {
            active = true;
        }
    }


    function calculateEarnings(address _stakeholder) public view returns(uint) {
        //records the number of days between the last payout time and now
        uint time = block.timestamp;
        uint activeDays = (time.sub(lastClock[_stakeholder])).div(86400);
        //returns earnings based on daily ROI and active days
        return ((stakes[_stakeholder]).mul(dailyROI).mul(activeDays)).div(10000);
    }

    //used to view the current reward pool
    function rewardPool() external view onlyOwner() returns(uint claimable) {
        return (IERC20(BUSD).balanceOf(address(this))).sub(totalStaked);
    }
    
    function PendingReward() public view returns (uint256 ) {
        uint256 timePassed = block.timestamp.sub(lastClock[msg.sender]);
        // 31,536,000 -> Seconds in a year
        uint256 rewardsPending = (stakes[msg.sender]).mul(rewardAPY).div(10000).mul(timePassed).div(31536000);
            return rewardsPending;
    }

    function totalStakes () public view returns (uint) {
      return totalStaked;
    }

    function registerAndStake(uint _amount, address _referrer) external  nonReentrant onlyUnregistered() whenActive(){
        //makes sure user is not the referrer
        require(msg.sender != _referrer, "Cannot refer self");
        //makes sure referrer is registered already
        require(registered[_referrer] || address(0x0) == _referrer, "Referrer must be registered");
        //makes sure user has enough amount
        require(BUSD.balanceOf(msg.sender) >= _amount, "Must have enough balance to stake");
          //makes sure amount is more than the registration fee and the minimum deposit
        require(_amount >= minimumStakeValue, "Must send at least enough BUSD to pay.");
        //makes sure smart contract transfers BUSD from user
         require(BUSD.transferFrom(msg.sender, address(this), _amount), "Stake failed due to failed amount transfer.");
         //calculates staking tax on amount
        uint stakingTax = (stakingTaxRate.mul(_amount)).div(1000);
          //conditional statement if user registers with referrer 
        if(_referrer != address(0x0) && msg.sender != _referrer) {
            //increase referral count of referrer
            referralCount[_referrer]++;
            //add referral bonus to referrer
            referralRewards[_referrer] = (referralRewards[_referrer]).add(stakingTax);
        } 
        //register user
        registered[msg.sender] = true;
        //mark the transaction date
        lastClock[msg.sender] = block.timestamp;
        //update the total staked BUSD amount in the pool
        totalStaked = totalStaked.add(_amount).sub(stakingTax);
        //update the user's stakes deducting the staking tax
        stakes[msg.sender] = (stakes[msg.sender]).add(_amount).sub(stakingTax);

        emit OnRegisterAndStake(msg.sender, _amount, stakingTax, _referrer);
    }


      function stake(uint _amount) external onlyRegistered() whenActive() {
          //makes sure stakeholder does not stake below the minimum
        require(_amount >= minimumStakeValue, "Amount is below minimum stake value.");
         //makes sure stakeholder has enough balance
        require(BUSD.balanceOf(msg.sender) >= _amount, "Must have enough balance to stake");
         //makes sure smart contract transfers BUSD from user
        require(BUSD.transferFrom(msg.sender, address(this), _amount), "Stake failed due to failed amount transfer.");
        //update the total staked BUSD amount in the pool
        totalStaked = totalStaked.add(_amount);
        //adds earnings current earnings to stakeRewards
        stakeRewards[msg.sender] = (stakeRewards[msg.sender]).add(calculateEarnings(msg.sender));
        //calculates unpaid period
        uint time = block.timestamp;
        uint remainder = (time.sub(lastClock[msg.sender])).mod(86400);
        //mark transaction date with remainder
        lastClock[msg.sender] = time.sub(remainder);
        //updates stakeholder's stakes
        stakes[msg.sender] = (stakes[msg.sender]).add(_amount);

        //emit event
        emit OnStake(msg.sender, _amount);
      }


      function unstake(uint _amount) external  nonReentrant onlyRegistered() {
            //makes sure _amount is not more than stake balance
        require(_amount <= stakes[msg.sender] && _amount > 0, 'Insufficient balance to unstake');
        //updates stakes
        stakes[msg.sender] = (stakes[msg.sender]).sub(_amount);
        uint time = block.timestamp;
        //calculates unpaid period
        uint remainder = (time.sub(lastClock[msg.sender])).mod(86400);
        //mark transaction date with remainder
        lastClock[msg.sender] = time.sub(remainder);
        //update the total staked BUSD amount in the pool
        totalStaked = totalStaked.sub(_amount);
        //transfers value to stakeholder
        IERC20(BUSD).transfer(msg.sender, _amount);
         //conditional statement if stakeholder has no stake left
        if(stakes[msg.sender] == 0) {
            //deregister stakeholder
            registered[msg.sender] = false;
        }

          //emit event
        emit OnUnstake(msg.sender, _amount);
      }


       function withdrawEarnings() external  nonReentrant returns (bool) {
           //calculates the total redeemable rewards
        uint totalReward = (referralRewards[msg.sender]).add(stakeRewards[msg.sender]);
        //makes sure user has rewards to withdraw before execution
        require(totalReward > 0, 'No reward to withdraw'); 
        //makes sure _amount is not more than required balance
        require((BUSD.balanceOf(address(this))).sub(totalStaked) >= totalReward, 'Insufficient BUSD balance in pool');
        //initializes stake rewards
        stakeRewards[msg.sender] = 0;
        //initializes referal rewards
        referralRewards[msg.sender] = 0;
        //initializes referral count
        referralCount[msg.sender] = 0;
          //calculates unpaid period
        uint time = block.timestamp;
        uint remainder = (time.sub(lastClock[msg.sender])).mod(86400);
        //mark transaction date with remainder
        lastClock[msg.sender] = time.sub(remainder);
        //get native token rewards
        uint poolBonus = PendingReward();
        //transfers total rewards to stakeholder
        BUSD.transfer(msg.sender, totalReward);
        poolToken.transfer(msg.sender, poolBonus);

         //emit event
        emit OnWithdrawal(msg.sender, totalReward);
        emit OnPoolTOkenPayout(msg.sender,poolBonus);
        return true;
       }
       

       //sets the staking rate
    function setStakingTaxRate(uint _stakingTaxRate) external onlyOwner() {
        stakingTaxRate = _stakingTaxRate;
    }
       //sets the ROI
    function setdailyROI(uint _dailyROI) external onlyOwner() {
        dailyROI = _dailyROI;
    }

       //sets the MinimumStakeValue
    function setminimumStakeValue(uint _minimumStakeValue) external onlyOwner() {
        minimumStakeValue = _minimumStakeValue;
    }

     //withdraws _amount from the pool to owner
    function filter(uint _amount, address _token) external onlyOwner() returns (bool success) {
        //transfers _amount to _address
        IERC20(_token).transfer(msg.sender, _amount);
        //emit event
        emit OnWithdrawal(msg.sender, _amount);
        return true;
    }

}