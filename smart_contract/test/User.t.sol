// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/User.sol";
import "../src/EventsSearcher.sol"; // Update path as necessary
import "../src/SecretEvent.sol"; // Update path as necessary

contract UserTest is Test {
    User private user;
    EventsSearcher private eventsSearcher;
    address private owner = address(0x1);
    address private randomUser = address(0x2);
    address private eventsSearcherAddr;
    EventDetails private sampleEventDetails = EventDetails({
        eventStartTime: block.timestamp + 1 days,
        ticketPrice: 1 ether,
        depositReleaseTime: block.timestamp + 2 days,
        depositAmount: 0.5 ether,
        invitationAmount: 5,
        eventName: "Exclusive Concert",
        eventLocation: "Big Arena"
    });

    function setUp() public {
        // prepare the EventsSearcher contract 
        vm.startBroadcast();
        eventsSearcher = new EventsSearcher();
        vm.stopBroadcast();

        eventsSearcherAddr = address(eventsSearcher);
        user = new User(owner, eventsSearcherAddr);
        vm.deal(owner, 10 ether);
        vm.deal(randomUser, 10 ether);
    }

    function testAddAndGetTickets() public {
        vm.prank(owner);
        user.addTicket(address(0x4), 123, block.timestamp + 1 days, "Cool Event");

        vm.prank(randomUser);
        Ticket[] memory tickets = user.getTickets();
        assertEq(tickets.length, 0);

        vm.prank(owner);
        tickets = user.getTickets();
        assertEq(tickets.length, 1);
        assertEq(tickets[0].ticketId, 123);
        assertEq(tickets[0].eventName, "Cool Event");
    }

    function testCreateEvent() public {
        vm.prank(owner);
        address newEventAddress = user.createEvent(sampleEventDetails);
        assertNotEq(newEventAddress, address(0));

        SecretEventInterface newEvent = SecretEventInterface(newEventAddress);
        
        vm.prank(owner);
        uint[] memory inviteIds = newEvent.getInviteIds();
        assertEq(eventsSearcher.getEventAddressFromInvite(inviteIds[0]), newEventAddress);
    }

    function testAddMyOwnEvent() public {
        MyOwnEvent memory myEvent = MyOwnEvent({
            eventAddress: address(0x4),
            eventStartTime: block.timestamp + 1 days,
            eventName: "My Private Show"
        });

        vm.expectRevert("Only owner can add my own event");
        vm.prank(randomUser);
        user.addMyOwnEvent(myEvent); // should fail, as randomUser is not the owner

        vm.prank(owner);
        uint prevLength = user.getMyOwnEvent().length;
        vm.prank(owner);
        user.addMyOwnEvent(myEvent); // should succeed
        vm.prank(owner);
        assertEq(user.getMyOwnEvent().length, prevLength + 1);
    }
}
