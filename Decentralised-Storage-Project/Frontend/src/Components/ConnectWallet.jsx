import React from 'react';

export default function ConnectWallet({ onConnect }) {
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onConnect(accounts[0]); 
        console.log('Connected account:', accounts[0]);
      } catch (err) {
        console.error('Failed to connect wallet:', err);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <button onClick={connectWalletHandler} style={{ width: '15%', padding: '10px', border: '1px solid #ccc', 
    borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Connect to MetaMask</button>
  );
}