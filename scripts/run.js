const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners(); // gets wallet address of the owner, and a random person
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");

  // we pass in "artist" to the constructor, which is the name of the domain
  const domainContract = await domainContractFactory.deploy("thirdy");
  await domainContract.deployed();

  console.log('Contract deployed by: ', owner.address);

  let txn = await domainContract.register('a11y', { value: hre.ethers.utils.parseEther('1234') });
  await txn.wait();

  // how much money is in here?
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log('Contract balance: ', hre.ethers.utils.formatEther(balance));

  // get funds from contract (as superCoder)
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch {
    console.log("withdraw failed");
  }

  // look in their wallet so we can compare
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log('Owner balance before withdrawal: ', hre.ethers.utils.formatEther(ownerBalance));

  // get funds from contract (as owner)
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log('Contract balance after withdrawal: ', hre.ethers.utils.formatEther(contractBalance));
  console.log('Owner balance after withdrawal: ', hre.ethers.utils.formatEther(ownerBalance));
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
