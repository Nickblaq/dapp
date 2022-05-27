// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
import hre from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Holdings = await hre.ethers.getContractFactory("Holdings");
  const holdings = await Holdings.deploy(
    "0x27e9b1837ba55fb1f476aa4fdc51a6829909bd27",
    "100",
    "1000",
    "0xd8a91e3dac1a589e9021a5482899261477c14235",
    "1000",
    "100"
    );

  await holdings.deployed();
  console.log("Holding deployed to:", holdings.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
