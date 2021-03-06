const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.NEMONIC,
  'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x'+bytecode, arguments: ['Hi There!'] })
    .send({ from: accounts[1], gas: '1000000' });

  console.log('contract address: ', inboxContract.options.address);
  provider.engine.stop();
};

deploy();
