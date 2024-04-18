import React, { useEffect, useState } from 'react';

const YourAssets = ({ state }) => {
  const [cids, setCids] = useState([]);
  const [currentCid, setCurrentCid] = useState('');
  const [currentNote, setCurrentNote] = useState('');

  // Load CIDs and notes from localStorage when the component mounts or when the account changes
  useEffect(() => {
    const storedCids = localStorage.getItem(`cids_${state.Account}`);
    if (storedCids) {
      setCids(JSON.parse(storedCids));
    }
  }, [state.Account]);

  const saveCid = () => {
    const newCids = [...cids, { cid: currentCid, note: currentNote }];
    setCids(newCids);
    localStorage.setItem(`cids_${state.Account}`, JSON.stringify(newCids));
    setCurrentCid('');
    setCurrentNote('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '50px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', fontWeight: 'bold' }}>Save Uploaded Files CID:</h3>
      <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          type="text"
          placeholder="Enter CID"
          value={currentCid}
          onChange={(e) => setCurrentCid(e.target.value)}
        />
        <input
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          type="text"
          placeholder="Enter Note"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <button
          style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'green', color: 'white', fontWeight: 'bold' }}
          onClick={saveCid}
        >
          Save CID
        </button>
      </div>
      <ul>
        {cids.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px', listStyle: 'none', background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            <strong>CID:</strong> {item.cid}, <strong>Note:</strong> {item.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourAssets;