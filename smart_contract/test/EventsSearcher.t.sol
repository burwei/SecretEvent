// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/EventsSearcher.sol"; 

contract EventsSearcherTest is Test {
    EventsSearcher private searcher;
    address private eventAddress1 = address(0x123);
    address private eventAddress2 = address(0x456);

    function setUp() public {
        searcher = new EventsSearcher();
    }

    function testAddSingleInvite() public {
        uint[] memory inviteIds = new uint[](5);
        inviteIds[0] = 1;
        inviteIds[1] = 2;
        inviteIds[2] = 3;
        inviteIds[3] = 4;
        inviteIds[4] = 5;


        searcher.addInviteIdsToEventAddress(inviteIds, eventAddress1);
        address retrievedAddress = searcher.getEventAddressFromInvite(2);
        assertEq(retrievedAddress, eventAddress1);
    }

    function testAddMultipleInvites() public {
        uint[] memory inviteIds = new uint[](2);
        inviteIds[0] = 1;
        inviteIds[1] = 2;

        searcher.addInviteIdsToEventAddress(inviteIds, eventAddress1);
        assertEq(searcher.getEventAddressFromInvite(1), eventAddress1);
        assertEq(searcher.getEventAddressFromInvite(2), eventAddress1);
    }

    function testUpdateInviteAddress() public {
        uint[] memory inviteIds = new uint[](1);
        inviteIds[0] = 1;

        searcher.addInviteIdsToEventAddress(inviteIds, eventAddress1);
        searcher.addInviteIdsToEventAddress(inviteIds, eventAddress2); // Update the address
        address retrievedAddress = searcher.getEventAddressFromInvite(1);
        assertEq(retrievedAddress, eventAddress2);
    }

    function testNonExistentInvite() public view {
        address retrievedAddress = searcher.getEventAddressFromInvite(999);
        assertEq(retrievedAddress, address(0));
    }
}
