const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.NEMONIC,
  'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const lotteryContract = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[1] });

  console.log('contract address: ', lotteryContract.options.address);
  provider.engine.stop();
};

deploy();
