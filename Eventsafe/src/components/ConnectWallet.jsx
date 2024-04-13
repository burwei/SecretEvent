import { useAccount } from 'wagmi';
import connectWallet from '../api/walletAndContract';

export default function ConnectButton() {
  provider = connectWallet();

  return (
    <div>
      {isDisconnected && <w3m-connect-button />}
      {!isDisconnected && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <w3m-network-button />
          <w3m-account-button />
        </div>
      )}
    </div>
  );
}
