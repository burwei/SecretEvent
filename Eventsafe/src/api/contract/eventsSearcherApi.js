import { ethers } from "ethers";

const getEventDetailsFromInvite = async (provider, inviteCode) => {
    eventSeacherContract = getEventsSearcherContract(provider)
    secretEventAddr = eventSeacherContract.getEventAddressFromInvite(inviteCode)
    secretEventContract = connectContract(provider, secretEventAddr, secretEventContractABI)
    return secretEventContract.eventDetails
}

