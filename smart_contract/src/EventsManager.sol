// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SecretEvent.sol";

contract EventsManager {
    uint nonce = 0;
    mapping(uint => address) eventIdToEventAddress;
    mapping(uint => uint) inviteIdToEventId;
    mapping(uint => uint) ticketHashToEventId;

    function createEvent(
        uint _depositReleaseTime,
        uint _depositAmount,
        uint _invitationAmount
    ) public returns (uint) {
        SecretEvent newEvent = new SecretEvent(
            _depositReleaseTime,
            _depositAmount
        );

        uint eventId = random();
        eventIdToEventAddress[eventId] = address(newEvent);

        for (uint i = 0; i < _invitationAmount; i++) {
            inviteIdToEventId[random()] = eventId;
        }

        return eventId;
    }

    function addTicketToEvent(uint eventId, uint ticketHash) public {
        ticketHashToEventId[ticketHash] = eventId;
    }

    function getEventIdFromInvite(uint inviteId) public view returns (uint) {
        return inviteIdToEventId[inviteId];
    }

    function getEventIdFromTicket(uint ticketHash) public view returns (uint) {
        return ticketHashToEventId[ticketHash];
    }

    function random() public returns (uint) {
        nonce++;
        return
            uint(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
            );
    }
}
