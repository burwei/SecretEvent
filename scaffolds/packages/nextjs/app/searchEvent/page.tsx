"use client";

import React, { useState } from 'react';
import { useScaffoldContract } from '~~/hooks/scaffold-eth/useScaffoldContract';

const SearchEventPage = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);

    const { data: EventsSearcher } = useScaffoldContract({
        contractName: "EventsSearcher",
    });

    const { data: SecretEvent } = useScaffoldContract({
        contractName: "SecretEvent",
    });

    const getEventAddress = async (inviteCode: bigint) => {
        const eventAddress = await EventsSearcher?.read.getEventAddressFromInvite([BigInt(inviteCode)]);
        if (!eventAddress) {
            return;
        }
        const details = await SecretEvent?.read.getEventDetails();
        return details ? formatEventDetails(details) : null;
    };

    const formatEventDetails = (details: any) => {
        return {
            eventName: details.eventName,
            eventStartTime: new Date(Number(details.eventStartTime) * 1000).toISOString(),
            eventLocation: details.eventLocation,
            ticketPrice: Number(details.ticketPrice),
            depositAmount: Number(details.depositAmount),
            depositReleaseTime: new Date(Number(details.depositReleaseTime) * 1000).toISOString(),
            invitationAmount: Number(details.invitationAmount)
        };
    };

    const handleSearch = async () => {
        let details = await getEventAddress(BigInt(inviteCode));
        if (details === null || details === undefined) {
            console.log("Event not found");
            return;
        }
        setEventName(details.eventName);
        setEventStartTime(details.eventStartTime);
        setEventLocation(details.eventLocation);
        setTicketPrice(details.ticketPrice);
        setDepositAmount(details.depositAmount);
    };

    return (
        <div>
            <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
            />
            <button onClick={handleSearch}>Search</button>
            {eventName !== '' && (
                <div>
                    <p>Event Name: {eventName}</p>
                    <p>Start Time: {eventStartTime}</p>
                    <p>Location: {eventLocation}</p>
                    <p>Ticket Price: {ticketPrice}</p>
                    <p>Deposit Amount: {depositAmount}</p>
                </div>
            )}
        </div>
    );
};

export default SearchEventPage;
