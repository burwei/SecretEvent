//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/YourContract.sol";
import "../contracts/EventsSearcher.sol";
import "../contracts/SecretEvent.sol";
import "../contracts/User.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        YourContract yourContract =
            new YourContract(vm.addr(deployerPrivateKey));
        console.logString(
            string.concat(
                "YourContract deployed at: ", vm.toString(address(yourContract))
            )
        );
        EventsSearcher eventSearcher =
            new EventsSearcher();
        console.logString(
            string.concat(
                "EventsSearcher deployed at: ", vm.toString(address(eventSearcher))
            )
        );
        User user =
            new User(
                vm.addr(deployerPrivateKey),
                address(eventSearcher)
            );
        console.logString(
            string.concat(
                "User deployed at: ", vm.toString(address(user))
            )
        ); 
        SecretEvent secretEvent =
            new SecretEvent(
                EventDetails(
                    1744636453,
                    100,
                    1744722853,
                    50,
                    25,
                    "ETHDam drinking party",
                    "Amsterdam central station"
                ),
                address(user),
                address(eventSearcher)
            );
        console.logString(
            string.concat(
                "SecretEvent deployed at: ", vm.toString(address(secretEvent))
            )
        );
        
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
