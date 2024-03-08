const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main()
{
    //Define a list of wallets to airdrop NFTs
    const airdropAddresses = [
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
        '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
        '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
        '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
        '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
    ];

    const factory = await hre.ethers.getContractFactory("NFTAirdrop");
    const [ owner ] = await hre.ethers.getSigners();
    const contract = await factory.deploy();

    await contract.deployed();
    console.log("Contract deployed to: ", contract.address);
    console.log("Contract deployed by (Owner): ", owner.address, "\n");
    let txn;
    txn = await contract.airdropNfts(airdropAddresses);
    await txn.wait();
    console.log("NFTs airdropped successfully!");

    console.log("\nCurrent NFT balances:")
    for (let i = 0; i < airdropAddresses.length; i++)
    {
        let bal = await contract.balanceOf(airdropAddresses[ i ]);
        console.log(`${i + 1}. ${airdropAddresses[ i ]}: ${bal}`);
    }

}

main().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });
