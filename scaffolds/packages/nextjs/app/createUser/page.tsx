"use client";

import React, { useState } from 'react';
import { useScaffoldContract } from '~~/hooks/scaffold-eth/useScaffoldContract';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth/useScaffoldContractWrite';
import { useScaffoldEventSubscriber } from '~~/hooks/scaffold-eth/useScaffoldEventSubscriber';

const CreateUserPage = () => {
    const [owner, setOwner] = useState('');

    const { data: EventsSearcher } = useScaffoldContract({
        contractName: "EventsSearcher",
    });

    const { write, error } = useScaffoldContractWrite({
        contractName: "EventsSearcher",
        functionName: "createUser",
        args: ['0x']
    });

    useScaffoldEventSubscriber({
        contractName: "EventsSearcher",
        eventName: "UserCreated",
        listener: logs => {
          logs.map(log => {
            const { userAddress } = log.args;
            alert(`User contract created with address: ${userAddress}`);
            console.log(`User contract created with address: ${userAddress}`)
          });
        },
      });

    const handleCreateUser = async () => {
        write({ args: [owner] });
    };

    return (
        <div>
            <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <button onClick={handleCreateUser}>Create User</button>
        </div>
    );
};

export default CreateUserPage;
