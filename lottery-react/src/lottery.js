import web3 from './web3';

const address = '0xcaf9adA25526Df76490422F3e98C3176f6123B86';

const abi =
[
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: "getPlayers",
      outputs: [ {
        "internalType":"address payable[]",
        "name":"",
        "type":"address[]"
      } ],
      stateMutability: "view",
      type: "function",
      constant: true,
      signature: "0x8b5b9ccc"
    },
    {
      inputs: [],
      name: 'countPlayers',
      outputs: [ {
        "internalType":"uint256",
        "name":"",
        "type":"uint256"
      } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x4bec8b39'
    },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe97dcb62'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [ {
        "name": "",
        "type": "address"
    } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x8da5cb5b'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0x5d495aea'
    },
    {
      inputs: [ {
        "internalType":"uint256",
        "name":"",
        "type":"uint256"
      } ],
      name: 'players',
      outputs: [ {
        "internalType":"address payable",
        "name":"",
        "type":"address"
      } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    }
  ];

export default new web3.eth.Contract(abi, address);
