# solidity-reloaded

## Install Truffle
```
npm install -g truffle
```

Init our project:
```
truffle init
```
Running the truffle init command, should create several directories and some JavaScript and Solidity files.

* contracts: this is the place where Truffle expects to find all our smart contracts. To keep the code organized, we can even create nested folders such as contracts/tokens.
truffle init should automatically create a contract called Migrations.sol and the corresponding migration file.

* migrations: a migration is a JavaScript file that tells Truffle how to deploy a smart contract.

* test: here we are expected to put the unit tests which will be JavaScript or Solidity files. Remember, once a contract is deployed it can't be changed, making it essential that we test our smart contracts before we deploy them.

* truffle.js and truffle-config.js: config files used to store the network settings for deployment. Truffle needs two config files because on Windows having both truffle.js and truffle.exe in the same folder might generate conflicts. 

## Install Ganache
Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.
```
https://www.trufflesuite.com/ganache
```

## Set Up Metamask with Ganache

1. In Metamask select Custom RPC
2. Fill out the form
   ```
   Network Name = Ganache
   New RPC URL = http://127.0.0.1:7545
   Chain ID = 1337
   ```

## Import one of Ganache's accounts into Metamask

1. In Ganache select an account, hit the key button and grab the private key
2. In Metamask go to Import Account and paste the private key
