const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");
const Frank = require('../artifacts/contracts/Frank.sol/Frank.json');

async function main() {
    const frankAddress = "0xc7D78A8586b62E5922f7ec629d1D5D47C56119B3";
    const bucketAddress = "0x1235694654FD7Bb80a67Fc7b0A6FAb7B072d3Ef7";
    const bucketABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const provider = await ethers.provider;
    const [signer] = await ethers.getSigners();

    // Create Frank token contract instance that connects to existing Frank contract
    const frankContract = new ethers.Contract(frankAddress, Frank.abi, signer);
    
    // 1. Approve transaction (give provided spender address the ability to spend tokens on behalf of the msg.sender)
        // Resolve to TransactionReceipt once transaction has been included in the chain for [number entered for confirms, e.g., transaction.wait([confirms = 1])]. If confirms is 0, and transaction has not been mined, null is returned
    const approveTx = await frankContract.connect(signer).approve(bucketAddress, 5);
    await approveTx.wait();
    console.log(approveTx);

    // Create Bucket contract instance that connects to existing Bucket contract
    const bucketContract = new ethers.Contract(bucketAddress, bucketABI, provider);

    // 2. (transferFrom) transaction (give provided spender address the ability to spend (or pull) tokens on behalf of the msg.sender)
        // Resolve to TransactionReceipt once transaction has been included in the chain for [number entered for confirms, e.g., transaction.wait([confirms = 1])]. If confirms is 0, and transaction has not been mined, null is returned
    const transferFromTx = await bucketContract.connect(signer).drop(frankAddress, 1);
    transferFromTx.wait();
    console.log(transferFromTx);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });