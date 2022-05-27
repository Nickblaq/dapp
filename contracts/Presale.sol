// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event ReferralCommissionPaid(address indexed user, address indexed referrer, uint256 commissionAmount);

}

contract Presale is ReentrancyGuard {

    using SafeMath for uint;
    using SafeMath for uint256;
    address public owner;
    uint public rateOfTokensToGivePerEth;
    uint public totalStaked;
    uint tokenToSend;
    address payable public walletToStoreTheEthers;
    IERC20 public LDN;
    uint public buyBonusRate;
    bool public active = true;


    mapping(address => uint) public referralRewards;
    mapping(address => uint) public referralCount;
    mapping (address => uint) contribution;
    uint16 public referralCommissionRate = 100;

    event ReferralCommissionPaid(address indexed user, address indexed referrer, uint256 commissionAmount);
    event ReferralRecorded(address indexed user, address indexed referrer);


     constructor (uint rate, address payable wallet, IERC20 token, uint _buyBonusRate )  {
        require(rate > 0, "Pre-Sale: rate is 0");
        require(wallet != address(0), "Pre-Sale: wallet is the zero address");
        require(address(token) != address(0), "Pre-Sale: token is the zero address");
        owner = msg.sender;
        buyBonusRate = _buyBonusRate;
        rateOfTokensToGivePerEth = rate;
         walletToStoreTheEthers = wallet;
        LDN = token;
        contribution[msg.sender] = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Contract Owner can call this function");
        _;
    }


    modifier whenActive() {
        require(active == true, "Smart Contract is currently inactive");
        _;
    }


    function contributions() public view returns (uint weiContributions) {
        return contribution[msg.sender];
    }

    function changeActiveStatus() external onlyOwner() {
        if(active) {
            active = false;
        }else {
            active = true;
        }
    }


    function buy(address _referrer) public payable whenActive(){
        require(msg.value > 0, "Cannot buy ZERO tokens");
         tokenToSend = rateOfTokensToGivePerEth * (msg.value / 1 ether);
        uint buyBonus = (buyBonusRate.mul(tokenToSend)).div(1000);
        if(_referrer != address(0x0)  && msg.sender != _referrer) {
            //increase referral count of referrer
            referralCount[_referrer]++;
             referralRewards[_referrer] += buyBonus;
        }
        contribution[msg.sender] += msg.value;
        totalStaked = totalStaked.add(msg.value);
        walletToStoreTheEthers.transfer(msg.value);
        LDN.transfer(msg.sender, tokenToSend);
    
    }

        function withdrawEarnings() external  nonReentrant returns (bool) {
           //calculates the total redeemable rewards
        uint totalReward = referralRewards[msg.sender];
        //makes sure user has rewards to withdraw before execution
        require(totalReward > 0, 'No reward to withdraw'); 
        //makes sure _amount is not more than required balance
        require(LDN.balanceOf(address(this)) >= totalReward, 'Insufficient LND balance in pool');
        //initializes referal rewards
        referralRewards[msg.sender] = 0;
        //initializes referral count
        referralCount[msg.sender] = 0;
        LDN.transfer(msg.sender, totalReward);
       }

    // receive payable function {}
}