const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); // gets wallet address of the owner, and a random person
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");

  // we pass in "kot" to the constructor, which is the name of the domain
  const domainContract = await domainContractFactory.deploy("kot");
  await domainContract.deployed();

  console.log('Deployed domain contract to: ', domainContract.address);
  console.log('Contract deployed by: ', owner.address);

  const txn = await domainContract.register('young', { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();

  const address = await domainContract.getAddress('young');
  console.log('owner of domain young: ', address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log('Contract balance: ', hre.ethers.utils.formatEther(balance));
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
