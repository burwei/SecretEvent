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
    uint nonce = 0;
    address internal owner;
    uint[] internal inviteIds;
    Ticket[] internal tickets;
    MyOwnEvent[] internal myOwnEvent;

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
        SecretEvent newEvent = new SecretEvent(_eventDetails);

        for (uint i = 0; i < _eventDetails.invitationAmount; i++) {
            inviteIdToEventAddress[random()] = address(newEvent);
        }

        return address(newEvent);
    }

    function random() public returns (uint) {
        nonce++;
        return
            uint(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
            );
    }
}
