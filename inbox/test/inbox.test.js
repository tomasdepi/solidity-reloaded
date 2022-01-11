const assert = require('assert');
const ganache = require('ganache-cli'); // for local ethereum test network
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js');

let accounts;
let inbox;
const initialMessage = 'Hi There!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('Contract can be deployed successfully', () => {
    assert.ok(inbox.options.address);
  });

  it('Contract has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it('Can update contract message', async () => {
    const newMessage = 'Bye There!';
    await inbox.methods.setMessage(newMessage).send({ from:accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  })
});
