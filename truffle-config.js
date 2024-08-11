
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(
        '4bd9d88655cc757d737c8c0a8dbdaa8f31915c01b6003772b3d79b2f4ffba312', // Replace with your private key
        'http://127.0.0.1:8545' // Localhost (ganache-cli)
      ),
      network_id: '*', // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
