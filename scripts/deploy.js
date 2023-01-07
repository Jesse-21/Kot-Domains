const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // we pass in "thirdy" to the constructor, which is the name of the domain
  const domainContract = await domainContractFactory.deploy("thirdy");
  await domainContract.deployed();

  console.log('Deployed domain contract to: ', domainContract.address);

  let txn = await domainContract.register('j', { value: hre.ethers.utils.parseEther('0.1') });
  await txn.wait();
  console.log("minted domain j.thirdy");

  // set record
  txn = await domainContract.setRecord('j', 'thirdy');
  await txn.wait();
  console.log("set record for domain j.thirdy");

  const address = await domainContract.getAddress('j');
  console.log('owner of domain j: ', address);

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
