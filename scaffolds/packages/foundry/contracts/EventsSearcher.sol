// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "sapphire-paratime/contracts/contracts/Sapphire.sol";
import "./SecretEvent.sol";
import "./User.sol";

event UserCreated(address indexed userAddress);

contract EventsSearcher {
    uint[] internal storedInviteIds;
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

    function getStoredInviteIds() public view returns (uint[] memory) {
        return storedInviteIds;
    }

    function getEventAddressFromInvite(
        uint inviteId
    ) public view returns (address) {
        return inviteIdToEventAddress[inviteId];
    }

    function getEventDetails(
        address eventAddress
    ) public view returns (EventDetails memory) {
        SecretEventInterface secretEvent = SecretEventInterface(eventAddress);
        return secretEvent.getEventDetails();
    }

    function createUser(address owner) public {
        User user = new User(owner, address(this));
        emit UserCreated(address(user));
    }
}
