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

interface EventsSearcherInterface {
    function addInviteIdsToEventAddress(uint[] memory inviteIds, address eventAddress) external;
}

interface SecretEventInterface {
    function getInviteIds() external view returns (uint[] memory);
}

contract User {
    address internal owner;
    address internal eventSearcherAddr;
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

    function addMyOwnEvent(MyOwnEvent memory _myOwnEvent) public {
        if (owner != msg.sender) {
            revert("Only owner can add my own event");
        }
        myOwnEvent.push(_myOwnEvent);
    }

    function getMyOwnEvent() public view returns (MyOwnEvent[] memory) {
        if (owner != msg.sender) {
            revert("Only owner can get my own event");
        }
        return myOwnEvent;
    }

    function createEvent(
        EventDetails memory _eventDetails
    ) public returns (address) {
        SecretEvent newEvent = new SecretEvent(
            _eventDetails,
            owner
        );

        EventsSearcherInterface eventsSearcher = EventsSearcherInterface(eventSearcherAddr);
        uint[] memory inviteIds = newEvent.getInviteIds();
        eventsSearcher.addInviteIdsToEventAddress(inviteIds, address(newEvent));
        return address(newEvent);
    }
}
