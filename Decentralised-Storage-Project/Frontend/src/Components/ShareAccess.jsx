import React, { useState } from "react";

const ShareAccess = ({ state }) => {
  const [cid, setCid] = useState("");
  const [targetAddress, setTargetAddress] = useState("");

  const { Contract, Account } = state;

  const grantAccess = async () => {
    if (!cid || !targetAddress || !Contract || !Account) {
      alert("Please ensure all fields are filled and you're connected to a wallet.");
      return;
    }

    try {
      const tx = await Contract.grantAccess(cid, targetAddress, { from: Account });
      await tx.wait();
      alert("Access granted successfully.");
    } catch (error) {
      console.error("Error granting access:", error);
      alert("Failed to grant access.");
    }
  };

  const revokeAccess = async () => {
    if (!cid || !targetAddress || !Contract || !Account) {
      alert("Please ensure all fields are filled and you're connected to a wallet.");
      return;
    }

    try {
      const tx = await Contract.revokeAccess(cid, targetAddress, { from: Account });
      await tx.wait();
      alert("Access revoked successfully.");
    } catch (error) {
      console.error("Error revoking access:", error);
      alert("Failed to revoke access.");
    }
  };

  return (
    <div style={{padding: '20px', maxWidth: '400px', margin: 'auto', background: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>Share or Revoke Access to a File:</h2>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter file CID"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        value={targetAddress}
        onChange={(e) => setTargetAddress(e.target.value)}
        placeholder="Enter target address"
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={grantAccess} style={{ width: '48%', padding: '10px', background: '#4CAF50', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Grant Access</button>
        <button onClick={revokeAccess} style={{ width: '48%', padding: '10px', background: '#f44336', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Revoke Access</button>
      </div>
    </div>
  );
};

export default ShareAccess;