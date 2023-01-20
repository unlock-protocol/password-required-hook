require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@unlock-protocol/hardhat-plugin");
const unlockNetworks = require('@unlock-protocol/networks').networks


const networks = Object.keys(unlockNetworks).reduce((prev, current) => {
  const network = unlockNetworks[current]
  return {
    ...prev,
    [network.chain]: {
      url: network.provider,
      accounts: process.env.PKEY ? [process.env.PKEY] : []
    }
  }
}, {})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.7',
    // optimizer is required to deploy unlock contracts
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks,
  etherscan: {
    apiKey: {
      polygon: 'W9TVEYKW2CDTQ94T3A2V93IX6U3IHQN5Y3',
      goerli: 'HPSH1KQDPJTNAPU3335G931SC6Y3ZYK3BF',
      mainnet: 'HPSH1KQDPJTNAPU3335G931SC6Y3ZYK3BF',
      bsc: '6YUDRP3TFPQNRGGZQNYAEI1UI17NK96XGK',
      gnosis: 'BSW3C3NDUUBWSQZJ5FUXBNXVYX92HZDDCV',
      optimisticEthereum: 'V51DWC44XURIGPP49X85VZQGH1DCBAW5EC',
      arbitrumOne: 'W5XNFPZS8D6JZ5AXVWD4XCG8B5ZH5JCD4Y',
      polygonMumbai: 'W9TVEYKW2CDTQ94T3A2V93IX6U3IHQN5Y3'
    }
  },
};
