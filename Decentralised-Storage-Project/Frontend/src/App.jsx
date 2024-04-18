import React, { useState } from "react";
import YourAsset from "./Components/YourAsset";
import GetAsset from "./Components/GetAsset";
import ShareAccess from "./Components/ShareAccess";
import FileUpload from "./Components/FileUpload";
import CheckAccess from "./Components/CheckAccess"
import { ethers } from "ethers";
import Drive from "./Artifacts/Contracts/Drive.sol/Drive.json";
import ConnectWallet from './Components/ConnectWallet';
import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'http://127.0.0.1:5001' });

const App = () => {
  const [state, setState] = useState({
    Provider: null,
    Contract: null,
    Account: null,
  });
  const [currentMenu, setCurrentMenu] = useState("FileUpload"); 

  const handleAccountConnected = async (account) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setState(prevState => ({
      ...prevState,
      Provider: provider,
      Account: account,
      Contract: new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3", 
        Drive.abi,
        signer
      ),
    }));
  };

  // Simple navigation
  const renderComponent = () => {
    switch (currentMenu) {
      case "FileUpload":
        return <FileUpload state={state} />;
      case "YourAsset":
        return <YourAsset state={state} />;
      case "GetAsset":
        return <GetAsset state={state} />;
      case "ShareAccess":
        return <ShareAccess state={state} />;
      case "CheckAccess":
        return <CheckAccess state={state} />;
      default:
        return <FileUpload state={state} />;
    }
  };

  return (
    <div className="flex flex-col m-2 gap-2 justify-stretch h-[96vh]">
      <div className="shadow-md flex-[0.05] flex justify-between bg-[#34495e] text-white p-2 rounded-sm items-center">
        <h2 className="text-base font-medium">
          Decentralised Storage Drive
        </h2>
        <p className="bg-[#5683b1] p-2 rounded-sm">
          <span className="font-bold">Account: </span>
          {state.Account}
        </p>
      </div>
      <div className="App-header">
        <ConnectWallet onConnect={handleAccountConnected} />
      </div>

      
      {state.Account && (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', flexWrap: 'wrap' }}>
        <div style={{ margin: '10px' }}>
          <button onClick={() => setCurrentMenu("FileUpload")} style={{ padding: '10px', width: '100%',border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Upload Files</button>
        </div>
        <div style={{ margin: '10px' }}>
          <button onClick={() => setCurrentMenu("GetAsset")} style={{ padding: '10px', width: '100%',border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Fetch Files</button>
        </div>
        <div style={{ margin: '10px' }}>
          <button onClick={() => setCurrentMenu("ShareAccess")} style={{ padding: '10px', width: '100%',border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Access Control</button>
        </div>
        <div style={{ margin: '10px' }}>
          <button onClick={() => setCurrentMenu("CheckAccess")} style={{ padding: '10px', width: '100%',border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Check Access</button>
        </div>
        <div style={{ margin: '10px' }}>
          <button onClick={() => setCurrentMenu("YourAsset")} style={{ padding: '10px', width: '100%',border: '1px solid #ccc', 
            borderRadius: '4px', cursor: 'pointer', background: '#e7f3ff', fontWeight: 'bold' }}>Your Files</button>
        </div>
          {renderComponent()}
        </div>
      )}
    </div>
  );
};

export default App;