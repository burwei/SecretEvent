// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecretEvent {
    uint depositReleaseTime;
    uint depositAmount;
    uint[] ticketHashes;
    mapping(uint => address) attenders;
    mapping(uint => uint) deposits;

    constructor(uint _depositReleaseTime, uint _depositAmount) {
        depositReleaseTime = _depositReleaseTime;
        depositAmount = _depositAmount;
    }

    function buyTikcet(string memory picURL) public payable{
        // TODO: implement it
    }

    function verifyTicket(uint ticketHash) public returns (bool){
        // TODO: implement it
    }

    function redeemDeposit(uint ticketHash) public {
        // TODO: implement it
    }

    function seizeDeposit(uint ticketHash) public {
        // TODO: implement it
    }
}