import React, { useState } from "react";

const CheckAccess = ({ state }) => {
  const [checkCid, setCheckCid] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [accessResult, setAccessResult] = useState(null);

  const checkAccess = async () => {
    // Ensure CID and address are provided
    if (!checkCid.trim() || !checkAddress.trim()) {
      alert("Please provide both a CID and an address.");
      return;
    }

    // Ensure the contract is available
    if (!state || !state.Contract) {
      console.error("Contract not available");
      alert("Contract not available.");
      return;
    }

    try {
      // Call the hasAccess method from the contract
      const hasAccess = await state.Contract.hasAccess(checkCid, checkAddress);
      setAccessResult(hasAccess);
    } catch (error) {
      console.error("Error checking access:", error);
      alert("Error checking access. See console for details.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="CID to check"
          value={checkCid}
          onChange={(e) => setCheckCid(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Address to check"
          value={checkAddress}
          onChange={(e) => setCheckAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={checkAccess} style={{ width: '48%', padding: '10px', border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Check Access</button>
      </div>
      {accessResult !== null && (
        <p style={{ textAlign: 'center' }}>{accessResult ? "Access granted" : "Access denied"}</p>
      )}
    </div>
  );
};

export default CheckAccess;