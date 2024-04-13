// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SecretEvent.sol";

contract EventsSearcher {
    mapping(uint => address) inviteIdToEventAddress;

    function addInviteIdsToEventAddress(
        uint[] memory inviteIds,
        address eventAddress
    ) public {
        for (uint i = 0; i < inviteIds.length; i++) {
            inviteIdToEventAddress[inviteIds[i]] = eventAddress;
        }
    }

    function getEventAddressFromInvite(
        uint inviteId
    ) public view returns (address) {
        return inviteIdToEventAddress[inviteId];
    }
}
