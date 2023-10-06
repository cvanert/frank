const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");

// https://sepolia.etherscan.io/token/0xc7d78a8586b62e5922f7ec629d1d5d47c56119b3

async function main() {
  const Frank = await ethers.deployContract("Frank");
  await Frank.waitForDeployment();

  console.log("Token address:", Frank.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });