// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SecretEvent.sol";

struct Ticket {
    address eventAddress;
    uint ticketId;
    uint eventStartTime;
    string eventName;
}

struct MyOwnEvent {
    address eventAddress;
    uint eventStartTime;
    string eventName;
}

contract User {
    address internal owner;
    address internal eventSearcherAddr;
    uint[] internal inviteIds;
    Ticket[] internal tickets;
    MyOwnEvent[] internal myOwnEvent;

    constructor(address _owner, address _eventSearcherAddr) {
        owner = _owner;
        eventSearcherAddr = _eventSearcherAddr;
    }

    function addTicket(
        address eventAddress,
        uint ticketId,
        uint eventStartTime,
        string memory eventName
    ) public {
        if (owner != msg.sender) {
            return;
        }
        tickets.push(Ticket(eventAddress, ticketId, eventStartTime, eventName));
    }

    function getTickets() public view returns (Ticket[] memory) {
        if (owner != msg.sender) {
            return new Ticket[](0);
        }
        return tickets;
    }

    function getInvites() public view returns (uint[] memory) {
        if (owner != msg.sender) {
            return new uint[](0);
        }
        return inviteIds;
    }

    function addMyOwnEvent(MyOwnEvent memory _myOwnEvent) public {
        if (owner != msg.sender) {
            return;
        }
        myOwnEvent.push(_myOwnEvent);
    }

    function createEvent(
        EventDetails memory _eventDetails
    ) public returns (address) {
        SecretEvent newEvent = new SecretEvent(
            _eventDetails,
            owner,
            eventSearcherAddr
        );
        return address(newEvent);
    }
}
