// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct EventDetails {
    uint eventStartTime;
    uint ticketPrice;
    uint depositReleaseTime;
    uint depositAmount;
    uint invitationAmount;
    string eventName;
    string eventLocation;
}

contract SecretEvent {
    EventDetails public eventDetails;
    uint[] internal inviteIds;
    mapping(uint => address) internal ticketIdToAttendee;
    mapping(uint => uint) internal ticketIdToDiposit;

    constructor(EventDetails memory _eventDetails) {
        eventDetails = _eventDetails;
    }

    function getInviteIds() public view returns (uint[] memory) {
        return inviteIds;
    }

    function buyTikcet(string memory picURL) public payable {
        // TODO: implement it
    }

    function verifyTicket(uint Ticket) public returns (bool) {
        // TODO: implement it
    }

    function redeemDeposit(uint Ticket) public {
        // TODO: implement it
    }

    function seizeDeposit(uint Ticket) public {
        // TODO: implement it
    }
}
