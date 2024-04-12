// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SecretEvent.sol";

contract EventsManager {
    mapping(uint => address) eventIdToEventAddress; 
    mapping(uint => uint) inviteIdToEventId;
    mapping(uint => uint) ticketHashToEventId;

    // TODO: implement it
    function createEvent(uint _depositReleaseTime, uint _invitationAmount) public returns (uint) {
        //SecretEvent newEvent = new SecretEvent(_depositReleaseTime, _depositAmount);
        
        // generate event ID and store the event address to eventIdToEventAddress 
        // genereate N invite IDs and store the event ID to inviteIdToEventId based on _invitationAmount 

        // return event ID
        return 0;
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
}
