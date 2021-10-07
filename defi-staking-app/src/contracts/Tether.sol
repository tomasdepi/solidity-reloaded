pragma solidity ^0.8.6;

contract Tether {
    string public name = 'Tether';
    string public symbol = 'USDT';
    uint public decimals = 18;
    uint256 public totalSupply = 1000000000000000000000000; // 1 Million USDT expressed in wei
}