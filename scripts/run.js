const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); // gets wallet address of the owner
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log('Deployed domain contract to: ', domainContract.address);
  console.log('Contract deployed by: ', owner.address);

  const txn = await domainContract.register('doom');
  await txn.wait();

  const domainOwner = await domainContract.getAddress('doom');
  console.log('Domain owner: ', domainOwner);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
