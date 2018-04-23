module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',       // Match any network id
      gas: 4712388,          // Set to Ropsten limit
      gasPrice: 20e9,        // 20 gwei
    },
    test: {
      host: 'localhost',
      port: 9545,
      network_id: '*',       // Match any network id
      gas: 4712388,          // Set to Ropsten limit
      gasPrice: 20e9,        // 20 gwei
    },
  },
};
