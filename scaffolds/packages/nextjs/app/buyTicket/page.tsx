"use client";

import { set } from 'nprogress';
import React, { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useScaffoldContract } from '~~/hooks/scaffold-eth/useScaffoldContract';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth/useScaffoldContractWrite';

const BuyTicketPage = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [picEncodingId, setPicEncodingId] = useState(0);
    const [showBuyTicket, setShowBuyTicket] = useState(true);

    const { data: EventsSearcher } = useScaffoldContract({
        contractName: "EventsSearcher",
    });

    const { data: SecretEvent } = useScaffoldContract({
        contractName: "SecretEvent",
    });

    const { write, error } = useScaffoldContractWrite({
        contractName: "SecretEvent",
        functionName: "buyTicket",
        args: [BigInt(0)],
        value: parseEther("1")
    });

    const getEventAddress = async (inviteCode: bigint) => {
        const eventAddress = await EventsSearcher?.read.getEventAddressFromInvite([BigInt(inviteCode)]);
        return eventAddress;
    };

    const handleSearch = async () => {
        let eventAddress = await getEventAddress(BigInt(inviteCode));
        if (eventAddress === null || eventAddress === undefined) {
            console.log("Event not found");
            return;
        }
        const details = await SecretEvent?.read.getEventDetails();
        if (details === null || details === undefined) {
            console.log("Event not found");
            return;
        }
        console.log(details);
        const totalPrice = Number(details.ticketPrice) + Number(details.depositAmount);
        setEventAddress(eventAddress);
        setTotalPrice(totalPrice);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target!.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBuyTicket = async () => {
        console.log("Buying ticket");
        await handleSearch();
        console.log(totalPrice.toString());
        write({ args: [picEncodingId], value: parseEther(totalPrice.toString()) });
        setShowBuyTicket(false);
    }

    useEffect(() => {
        if (error) {
            console.error("Error encountered:", error.message);
            alert(`Transaction Error: ${error.message}`);
            setShowBuyTicket(true);
        }
    }, [error]); // R


    return (
        <div>
            <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
                type="text"
                value={picEncodingId}
                onChange={(e) => setPicEncodingId(Number(e.target.value))}
                placeholder="Enter Picture encoding ID"
            />
            {showBuyTicket && <button onClick={handleBuyTicket}>Pay</button>}
            {image && <img src={image as string} alt="Uploaded" style={{ width: '30%', marginTop: '10px' }} />}
            {!showBuyTicket && <p>Ticket purchased successfully!</p>}
        </div>
    );
};


export default BuyTicketPage;
