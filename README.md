# Password Hook for Locks

This project implements an Unlock PublicLock Hook that can be used on PublicLocks to ensure that users who are purchasing a key from a lock have entered the right password on the frontend application.

When the user enters a password on the frontend application. This password is used to generate a private key that is then used to sign the recipient's address. That signature is passed as the data argument on the `purchase` call.

A lock manager can set the right signer based on the password for a lock using `setSigner`.

The Unlock Protocol team has deployed and verified a version of this hook on the following networks:

Production networks:

TODO

Test networks:

- [Goerli](https://goerli.etherscan.io/address/0xe6e4b5daa2733e5090f23820d5a17d6cb25eea42)

## Example

[This lock](https://goerli.etherscan.io/address/0x44Dc120086c34305098c379eB5638Bfc0d31D47a) deployed is deployed on Goerli and uses this password hook. This means you can only purchase a key if you go [through this checkout URL](https://app.unlock-protocol.com/checkout?redirectUri=https%3A%2F%2Funlock-protocol.com&paywallConfig=%7B"locks"%3A%7B"0x44Dc120086c34305098c379eB5638Bfc0d31D47a"%3A%7B"network"%3A5%7D%7D%2C"pessimistic"%3Atrue%2C"persistentCheckout"%3Atrue%2C"icon"%3A"https%3A%2F%2Flocksmith.unlock-protocol.com%2Flock%2F0x44Dc120086c34305098c379eB5638Bfc0d31D47a%2Ficon"%2C"password"%3Atrue%7D) and if you enter the right password: `sek3e+-pass30rD`.

If you don't enter the password, or if you use an incorrect password, the transaction will fail.

## Using the hook for your own lock

1. First, you need to pick a password, then go to this page to generate the corresponding Ethereum address.

2. Then, click on which network your lock has been deployed on (list above) and head `Contract` > `Write Contract`. Connect your wallet (you need to be connected as a lock's manager) and click on `setSigner`. There, enter the lock address, and then the Ethereum address generated in the previous step.

3. Finally, you need to point your lock to the hook. Using your lock's block explorer page, click on `Contract` > `Write as Proxy`. Connect your wallet (you need to be connected as a lock's manager) and look for `setEventHooks`. In the `_onKeyPurchaseHook` enter the address of the hook (from the list above), and enter `0x0000000000000000000000000000000000000000` for all the other hooks (unless of course, you want to use them...).

4. [Build a Checkout URL](https://docs.unlock-protocol.com/tools/checkout/configuration) and make sure you include the `"passord": true` option in it so that users are prompted for the password when they go through the checkout flow!

## Dev

You can deploy the hook on other chains by adding the chain to the `hardhat.config.js` config file and calling:

```
yarn run hardhat run scripts/deploy.js --network my-network
```

To verify, call :

```
yarn run hardhat verify --network my-network 0xhook-address 0x58b5cede554a39666091f96c8058920df5906581
```

Running tests:

```
yarn run hardhat test test/sample-test.js
```

## Front-end

Please, make sure you use the `captcha` option in the `paywallConfig` object for the captcha to actually be completed and transactions to go through.
