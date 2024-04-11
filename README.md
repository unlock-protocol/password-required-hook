# Password Hook for Locks

This project implements an Unlock [PublicLock Hook](https://docs.unlock-protocol.com/core-protocol/public-lock/hooks) that can be used on Locks smart contracts to ensure that users who are purchasing a key from a lock have entered the right password on the frontend application.

This process is _secured_ and cannot be bypassed by calling the contract directly as the password is used to submit the transaction on-chain.

When the user enters a password on the frontend application, the password is used to generate a private key that is then used to sign the recipient's address. That signature is passed as the data argument on the `purchase` call.

A lock manager can set the right signer based on the password for a lock using `setSigner`.

The Unlock Protocol team has deployed and verified a version of this hook on the following networks:

## Using the hook for your own lock

From the Unlock Dashboard, go to "Settings", then select "Advanced" and finally "Hooks". Check this [Guide](https://unlock-protocol.com/guides/password-protected-nft-memberships/) for more details.
