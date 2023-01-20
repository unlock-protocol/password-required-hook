# Password Hook for Locks

This project implements an Unlock [PublicLock Hook](https://docs.unlock-protocol.com/core-protocol/public-lock/hooks) that can be used on Locks smart contracts to ensure that users who are purchasing a key from a lock have entered the right password on the frontend application.

This process is _secured_ and cannot be bypassed by calling the contract directly as the password is used to submit the transaction on-chain.

When the user enters a password on the frontend application, the password is used to generate a private key that is then used to sign the recipient's address. That signature is passed as the data argument on the `purchase` call.

A lock manager can set the right signer based on the password for a lock using `setSigner`.

The Unlock Protocol team has deployed and verified a version of this hook on the following networks:

### Production networks:

- [Ethereum](https://etherscan.io/address/0x936Ed3E71b5990bC9A94074835D08C6ca7bbFad0): `0x936Ed3E71b5990bC9A94074835D08C6ca7bbFad0`
- [Polygon](https://polygonscan.com/address/0x9F4AE507d7E91Ab37CF35f792940fE079bd4E24d): `0x9F4AE507d7E91Ab37CF35f792940fE079bd4E24d`
- [Gnosis Chain](https://blockscout.com/xdai/mainnet/address/0x927D68eAE936Ec0111f01Fc4Ddd9cC57DB3f0Af2): `0x927D68eAE936Ec0111f01Fc4Ddd9cC57DB3f0Af2`
- [Optimism](https://optimistic.etherscan.io/address/0x34EbEc0AE80A2d078DE5489f0f5cAa4d3aaEA355): `0x34EbEc0AE80A2d078DE5489f0f5cAa4d3aaEA355`
- [Abitrum](https://arbiscan.io/address/0xd0b14797b9D08493392865647384974470202A78): `0xd0b14797b9D08493392865647384974470202A78`
- [BNB Chain](https://bscscan.com/address/0x338b1f296217485bf4df6CE9f93ab4C73F72b57D): `0x338b1f296217485bf4df6CE9f93ab4C73F72b57D`

### Test networks:

- [Goerli](https://goerli.etherscan.io/address/0xCa837900f7DaB40787b608b6738d1B730f1d2759): `0xCa837900f7DaB40787b608b6738d1B730f1d2759`
- [Mumbai](https://mumbai.polygonscan.com/address/0x34EbEc0AE80A2d078DE5489f0f5cAa4d3aaEA355): `0x34EbEc0AE80A2d078DE5489f0f5cAa4d3aaEA355`

## Example

[This lock](https://goerli.etherscan.io/address/0x44Dc120086c34305098c379eB5638Bfc0d31D47a) deployed is deployed on Goerli and uses this password hook. This means you can only purchase a key if you go [through this checkout URL](https://app.unlock-protocol.com/checkout?redirectUri=https%3A%2F%2Funlock-protocol.com&paywallConfig=%7B"locks"%3A%7B"0x44Dc120086c34305098c379eB5638Bfc0d31D47a"%3A%7B"network"%3A5%7D%7D%2C"pessimistic"%3Atrue%2C"persistentCheckout"%3Atrue%2C"icon"%3A"https%3A%2F%2Flocksmith.unlock-protocol.com%2Flock%2F0x44Dc120086c34305098c379eB5638Bfc0d31D47a%2Ficon"%2C"password"%3Atrue%7D) and if you enter the right password: `sek3e+-pass30rD`.

If you don't enter the password, or if you use an incorrect password, the transaction will fail.

## Using the hook for your own lock

1. First, you need to pick a password, then [go to this page to generate the corresponding Ethereum address](https://unlock-protocol.github.io/password-required-hook/). You can also generate this locally if needed by checking out the repo and switching to the `gh-page` branch.

![image](https://user-images.githubusercontent.com/17735/189868482-443c6968-0f3a-4cde-ad69-0a5ae8e54238.png)

2. Then, click on which network your lock has been deployed on (list above) and head `Contract` > `Write Contract`. Connect your wallet (you need to be connected as a lock's manager) and click on `setSigner`. There, enter the lock address, and then the wallet address generated in the previous step.

![image](https://user-images.githubusercontent.com/17735/189868581-f5a15a26-ec6f-40db-a169-9f4e638c76fa.png)

3. Finally, you need to point your lock to the hook. Using your lock's block explorer page, click on `Contract` > `Write as Proxy`. Connect your wallet (you need to be connected as a lock's manager) and look for `setEventHooks`. In the `_onKeyPurchaseHook` enter the address of the hook (from the list above), and enter `0x0000000000000000000000000000000000000000` for all the other hooks (unless of course, you want to use them...).

![image](https://user-images.githubusercontent.com/17735/189869051-5c20e082-9ee3-4e9c-bb39-9f7c5e93c301.png)

4. [Build a Checkout URL](https://docs.unlock-protocol.com/tools/checkout/configuration) and make sure you include the `"password": true` option in it so that users are prompted for the password when they go through the checkout flow!

## Dev

You can deploy the hook on other chains by adding the chain to the `hardhat.config.js` config file and calling:

```
yarn run hardhat run scripts/deploy.js --network my-network
```

To verify the contract on block explorers, call :

```
yarn run hardhat verify --network my-network 0xhook-address
```

Running tests:

```
yarn run hardhat test test/sample-test.js
```

## Older versions:

For lock that are prior to v12, please use the following: (or please, upgrade your locks!)

Production networks:

- [Ethereum](https://etherscan.io/address/0xe87eFc02F26EFE45171afDBEc85D743FDB2Eb1FB#code)
- [Polygon](https://polygonscan.com/address/0xD925Ac2887Ba4372849F0fd64217A6749552bb21)
- [Gnosis Chain](https://blockscout.com/xdai/mainnet/address/0xe87eFc02F26EFE45171afDBEc85D743FDB2Eb1FB)

Test networks:

- [Goerli](https://goerli.etherscan.io/address/0xe6e4b5daa2733e5090f23820d5a17d6cb25eea42)
