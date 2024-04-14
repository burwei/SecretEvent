// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "sapphire-paratime/contracts/contracts/Sapphire.sol";
import "./EventsSearcher.sol";


struct EventDetails {
    uint eventStartTime;
    uint ticketPrice;
    uint depositReleaseTime;
    uint depositAmount;
    uint invitationAmount;
    string eventName;
    string eventLocation;
}

struct TicketVerification {
    string eventName;
    uint eventStartTime;
    uint ticketId;
    string eventLocation;
    bool isVerified;
}

contract SecretEvent {
    address internal owner;
    uint internal nonce = 0;
    uint[] internal inviteIds;
    uint[] internal ticketIds;
    uint[] internal picEncodingIds;
    mapping(uint => address) internal ticketIdToAttendee;
    mapping(uint => bool) internal ticketIdToDepositRedeemed;
    EventDetails internal eventDetails;

    constructor(
        EventDetails memory _eventDetails,
        address _orginizer
    ) {
        eventDetails = _eventDetails;
        owner = _orginizer;

        for (uint i = 0; i < _eventDetails.invitationAmount; i++) {
            inviteIds.push(random());
        }
    }

    function getEventDetails() public view returns (EventDetails memory) {
        return eventDetails;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getInviteIds() public view returns (uint[] memory) {
        return inviteIds;
    }

    function getTicketNum() public view returns (uint) {
        return ticketIds.length;
    }

    function buyTicket(uint picEncodingId) public payable {
        if (msg.value < eventDetails.ticketPrice + eventDetails.depositAmount) {
            revert("Not enough money to buy ticket");
        }
        uint ticketId = random();
        ticketIds.push(ticketId);
        ticketIdToAttendee[ticketId] = msg.sender;
        picEncodingIds.push(picEncodingId);
    }

    function verifyTicket(uint ticketId) public view returns (TicketVerification memory) {
        if (ticketIdToAttendee[ticketId] != address(0)) {
            return TicketVerification(
                eventDetails.eventName,
                eventDetails.eventStartTime,
                ticketId,
                eventDetails.eventLocation,
                true
            );
        }
        return TicketVerification("", 0, 0, "", false);
    }

    function redeemDeposit(uint ticketId) public {
        // TODO: We need to check if it's ok to redeem the deposit
        // Now we just redeem it anyways
        if (msg.sender != ticketIdToAttendee[ticketId]) {
            revert("You are not the owner of this ticket");
        }

        if (block.timestamp > eventDetails.depositReleaseTime) {
            revert("Deposit is too late to redeem");
        }

        if (ticketIdToDepositRedeemed[ticketId]) {
            revert("Deposit has been redeemed");
        }

        ticketIdToDepositRedeemed[ticketId] = true;
        payable(msg.sender).transfer(eventDetails.depositAmount);
    }

    function seizeDeposit(uint ticketId) public {
        // set redeemed to true so it can't be redeemed
        ticketIdToDepositRedeemed[ticketId] = true;
    }

    function getPicEncodingIds() public view returns (uint[] memory) {
        return picEncodingIds;
    }

    function random() public returns (uint) {
        nonce++;
        bytes32 seed = bytes32(Sapphire.randomBytes(32, " "));
        uint number = uint(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))
            ) % 1000000000000;
        return number;
    }
}
