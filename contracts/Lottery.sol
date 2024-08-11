pragma solidity ^0.8.4;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= .02 ether, "Minimum entry fee is 0.02 ETH");
        players.push(msg.sender);
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");

        uint index = random() % players.length;

        // Check if the selected index is valid, otherwise default to the first player
        if (index >= players.length || players[index] == address(0)) {
            index = 0;
        }

        lastWinner = players[index];
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);  // Reset players array
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getLastWinner() public view returns (address) {
        return lastWinner;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }
}
