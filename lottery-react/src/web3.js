import Web3 from "web3"; // our web3 version
 
window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum); // metamask injected provider, get metamask web3 version 
 
export default web3;
