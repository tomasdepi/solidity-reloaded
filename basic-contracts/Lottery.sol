// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {

    address public owner;
    address payable[] public players;
    mapping(address => bool) playersWhoEntered;

    constructor() {
        owner = msg.sender;
    }

    function enter() public payable {
        require(!playersWhoEntered[msg.sender], 'Caller has already entered.');
        require(msg.value == 1000 wei, 'Need to send 1000 wei to enter the Lottery');

        players.push(payable(msg.sender));
        playersWhoEntered[msg.sender] = true;
    }

    function pickWinner() public onlyOwner {
        uint winnerId = random() % players.length;
        players[winnerId].transfer(address(this).balance);

        resetLottery();
    }

    function resetLottery() private {
        players = new address payable[](0); // empty player list
    }

    function countPlayers() public view returns(uint) {
        return players.length;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Caller must be the Owner.');
        _;
    }

    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
}
