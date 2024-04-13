import { useAccount } from 'wagmi';

export default function ConnectButton() {
  const { isDisconnected } = useAccount();

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
