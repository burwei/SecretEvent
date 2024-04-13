// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/EventsSearcher.sol"; // Update path as necessary
import "../src/SecretEvent.sol"; // Update path as necessary

contract SecretEventTest is Test {
    SecretEvent private secretEvent;
    EventsSearcher private eventsSearcher;
    address private organizer = address(0x1);
    address private attendee = address(0x2);
    EventDetails private details = EventDetails({
        eventStartTime: block.timestamp + 1 days,
        ticketPrice: 1 ether,
        depositReleaseTime: block.timestamp + 2 days,
        depositAmount: 0.5 ether,
        invitationAmount: 100,
        eventName: "Secret Party",
        eventLocation: "Undisclosed Location"
    });

    function testEventSetUp() public {
        eventsSearcher = new EventsSearcher();
        secretEvent = new SecretEvent(details, organizer);
        vm.prank(attendee);
        vm.deal(attendee, 10 ether);
    }

    // function testEventSetup() public {
    //     uint[] memory inviteIds = secretEvent.getInviteIds();
    //     assertTrue(inviteIds.length == details.invitationAmount);
    // }

    // function testBuyTicket() public {
    //     vm.prank(attendee);
    //     secretEvent.buyTikcet{value: 1.5 ether}("ipfs://somehash");
    //     uint ticketNum = secretEvent.getTicketNum();
    //     assertEq(ticketNum, 1);
    // }

    // function testVerifyTicket() public {
    //     vm.prank(attendee);
    //     secretEvent.buyTikcet{value: 1.5 ether}("ipfs://somehash");
    //     uint ticketId = secretEvent.getTicketNum();  // assuming ticketIds are sequentially assigned and start from 0

    //     TicketVerification memory verification = secretEvent.verifyTicket(ticketId);
    //     assertTrue(verification.isVerified);
    //     assertEq(verification.eventName, details.eventName);
    // }

    // function testRedeemDeposit() public {
    //     vm.prank(attendee);
    //     secretEvent.buyTikcet{value: 1.5 ether}("ipfs://somehash");
    //     uint ticketId = secretEvent.getTicketNum();  // assuming ticketIds are sequentially assigned and start from 0

    //     vm.warp(details.depositReleaseTime - 1 hours);  // move time forward to just before deposit release time
    //     vm.prank(attendee);
    //     secretEvent.redeemDeposit(ticketId);  // should succeed

    //     vm.expectRevert("Deposit has been redeemed");
    //     vm.prank(attendee);
    //     secretEvent.redeemDeposit(ticketId);  // attempt to redeem again
    // }

    // function testSeizeDeposit() public {
    //     vm.prank(attendee);
    //     secretEvent.buyTikcet{value: 1.5 ether}("ipfs://somehash");
    //     uint ticketId = secretEvent.getTicketNum();  // assuming ticketIds are sequentially assigned and start from 0

    //     vm.prank(organizer);
    //     secretEvent.seizeDeposit(ticketId);

    //     vm.expectRevert("Deposit has been redeemed");
    //     vm.prank(attendee);
    //     secretEvent.redeemDeposit(ticketId);  // attempt to redeem after seizing
    // }
}
