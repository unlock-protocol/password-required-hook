const { ethers, network } = require("hardhat");

async function main() {
  const password = 'sek3e+-pass30rD'

  // Build the signer
  const encoded = ethers.utils.defaultAbiCoder.encode(
    ['bytes32'],
    [ethers.utils.id(password)]
  )
  const privateKey = ethers.utils.keccak256(encoded)
  const privateKeyAccount = new ethers.Wallet(privateKey)

  console.log(privateKeyAccount.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });