import { ethers } from "ethers";
import eventsSearcherContractABI from './abi/EventsSearcher.json';
import secretEventContractABI from './abi/SecretEvent.json';
import userContractABI from './abi/User.json';

const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, provider);

    return provider;
};

const connectContract = async (provider, contractAddr, contractABI) => {
    let contract = new ethers.Contract(contractAddr, contractABI, provider);
    contract = contract.connect(provider.getSigner());
    return contract;
}

const getEventsSearcherContract = async (provider) => {
    const contractAddr = process.env.REACT_APP_CONTRACT_ADDRESS_EVENTSSEARCHER;
    let contract = new ethers.Contract(
        contractAddr,
        eventsSearcherContractABI,
        provider
    );
    contract = contract.connect(provider.getSigner());
    return contract;
}
