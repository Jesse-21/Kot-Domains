const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // we pass in "artist" to the constructor, which is the name of the domain
  const domainContract = await domainContractFactory.deploy("artist");
  await domainContract.deployed();

  console.log('Deployed domain contract to: ', domainContract.address);

  let txn = await domainContract.register('jesse21', { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();
  console.log("minted domain jesse21.artist");

  // set record
  txn = await domainContract.setRecord('Jesse21', 'J21!');
  await txn.wait();
  console.log("set record for domain jesse21.artist");

  const address = await domainContract.getAddress('jesse21');
  console.log('owner of domain jesse21: ', address);

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
