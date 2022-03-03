const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // we pass in "kot" to the constructor, which is the name of the domain
  const domainContract = await domainContractFactory.deploy("kot");
  await domainContract.deployed();

  console.log('Deployed domain contract to: ', domainContract.address);

  let txn = await domainContract.register('hawkeye', { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();
  console.log("minted domain hawkeye.kot");

  // set record
  txn = await domainContract.setRecord('hawkeye', 'I am a great archer!');
  await txn.wait();
  console.log("set record for domain hawkeye.kot");

  const address = await domainContract.getAddress('hawkeye');
  console.log('owner of domain hawkeye: ', address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log('Contract balance: ', hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
