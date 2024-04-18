import React, { useState } from "react";

const GetAsset = () => {
  const [cidInput, setCidInput] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const fetchFile = () => {
    if (!cidInput.trim()) return alert("Please enter a valid CID");
    const url = `http://localhost:8080/ipfs/${cidInput}`;
    setFileUrl(url); 
  };

  return (
    <div className="h-[100%] w-[100%] flex flex-col items-center">
      <input
        className="w-[50%] p-2 outline-none"
        type="text"
        placeholder="Enter File CID"
        value={cidInput}
        onChange={(e) => setCidInput(e.target.value)}
      />
      <button className="mt-2 w-[20%] bg-red-500 p-2 text-white font-semibold" onClick={fetchFile}>
        Fetch
      </button>

      {fileUrl && (
        <div className="file-display mt-4">
          <p>File URL:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300">
            {fileUrl}
          </a>
          <div className="image-preview mt-2">
            <img src={fileUrl} alt="IPFS Content" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAsset;
