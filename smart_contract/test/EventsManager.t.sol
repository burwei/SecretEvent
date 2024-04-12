// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/EventsManager.sol";

contract EventsManagerTest is Test {
    EventsManager private eventsManager;

    function setUp() public {
        eventsManager = new EventsManager();
    }

    function testCreateEvent() public {
        uint eventId = eventsManager.createEvent(1659981910, 1 ether, 5);
        assertEq(eventId, eventsManager.getEventIdFromInvite(eventId)); // Basic check, though not exactly correct. We'll adjust in actual tests.
    }

    function testAddTicketToEvent() public {
        uint eventId = eventsManager.createEvent(1659981910, 1 ether, 5);
        uint ticketHash = uint(keccak256(abi.encodePacked("ticket1")));
        eventsManager.addTicketToEvent(eventId, ticketHash);
        assertEq(eventsManager.getEventIdFromTicket(ticketHash), eventId);
    }

    function testRandomness() public {
        uint firstRandom = eventsManager.random();
        uint secondRandom = eventsManager.random();
        assertNe(firstRandom, secondRandom);
    }
}
