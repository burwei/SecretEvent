// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "sapphire-paratime/contracts/contracts/Sapphire.sol";
import "./SecretEvent.sol";

contract EventsSearcher {
    uint[] public storedInviteIds;
    mapping(uint => address) internal inviteIdToEventAddress;

    function addInviteIdsToEventAddress(
        uint[] memory inviteIds,
        address eventAddress
    ) public {
        for (uint i = 0; i < inviteIds.length; i++) {
            inviteIdToEventAddress[inviteIds[i]] = eventAddress;
            storedInviteIds.push(inviteIds[i]);
        }
    }

    function getFirstStoredInviteId() public view returns (uint) {
        return storedInviteIds[0];
    }

    function getStoredInviteIds() public view returns (uint[] memory) {
        return storedInviteIds;
    }

    function getEventAddressFromInvite(
        uint inviteId
    ) public view returns (address) {
        return inviteIdToEventAddress[inviteId];
    }
}
