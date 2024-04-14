"use client";

import React, { useState } from 'react';
import { useScaffoldContract } from '~~/hooks/scaffold-eth/useScaffoldContract';

const BuyTicketPage = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const { data: EventsSearcher } = useScaffoldContract({
        contractName: "EventsSearcher",
    });

    const { data: SecretEvent } = useScaffoldContract({
        contractName: "SecretEvent",
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
        setEventAddress(eventAddress);
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


    return (
        <div>
            <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image as string} alt="Uploaded" style={{ width: '100%', marginTop: '10px' }} />}
            <button onClick={handleSearch}>Upload Image</button>
            <button onClick={handleSearch}>Pay</button>
        </div>
    );
};


export default BuyTicketPage;
