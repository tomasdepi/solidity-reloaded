const assert = require('assert');
const ganache = require('ganache-cli'); // for local ethereum test network
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one account to deploy the contract
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
});

describe('Lottery', () => {
  it('Contract can be deployed successfully', () => {
    assert.ok(lottery.options.address);
  });

  it('Can enter the lottery', async () => {
    const countBeforeJoining = parseInt(await lottery.methods.countPlayers().call({ from: accounts[0] }));

    await lottery.methods.enter()
      .send({ from: accounts[1], value: '1000' })

    const countAfterJoining = parseInt(await lottery.methods.countPlayers().call({ from: accounts[0] }));

    assert.equal(countAfterJoining, countBeforeJoining+1);
  });

  it('If no wei is sent must throw error', async () => {
    try {
      await lottery.methods.enter()
        .send({ from: accounts[1] })
    } catch (err) {
      assert(err);
    }
  });

  it('Only owner can call pickWinner', async () => {

    await lottery.methods.enter()
      .send({ from: accounts[1], value: '1000' })

    await lottery.methods.pickWinner()
      .send({ from: accounts[0] }) // owner

    try {
      await lottery.methods.enter()
        .send({ from: accounts[1], value: '1000' })

      await lottery.methods.pickWinner()
        .send({ from: accounts[1] }) // not the owner
    } catch (err) {
      assert(err);
    }
  });
});
