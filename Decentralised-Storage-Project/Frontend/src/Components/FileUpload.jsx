import React, { useState } from "react";
import { create } from 'ipfs-http-client';

// Connect to your local IPFS node
const ipfs = create({ url: 'http://127.0.0.1:5001' });

const FileUpload = ({ State }) => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [fileCID, setFileCID] = useState("");

  const upload = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }
      // Use IPFS client to add the file
      const added = await ipfs.add(file);
      const cid = added.path;
      console.log('Uploaded file CID:', cid);
      setFileCID(cid);

      // If connected to a smart contract and account is available
      if (State?.Contract && State?.Account) {
        await State.Contract.upload(cid, { from: State.Account });
      }
      setFile(null);
      setFileURL(null);
      alert("File Uploaded Successfully");
    } catch (err) {
      console.error("Error in Uploading File to IPFS:", err);
      alert("Error in Uploading File to IPFS: " + err.message);
    }
  };

  return (
    <div className="w-[60%] h-[100%] flex justify-center items-center mx-auto flex-col gap-2">
      <section className="flex w-[100%] text-white gap-2 h-[70%]">
        <div
          onClick={() => document.querySelector(".input-field")?.click()}
          className="cursor-pointer w-[50%] bg-red-500 p-2 flex justify-center items-center shadow-2xl rounded-lg flex-col gap-5"
        >
          <img className="hover:scale-110 hover:transition-all" src="./Icon.png" height={60} width={60} alt="Upload Icon" />
          <input
            type="file"
            className="input-field"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFile(file);
                setFileURL(URL.createObjectURL(file));
              }
            }}
          />
          <small>Select File</small>
        </div>
        <div className="w-[50%] bg-red-500 p-2 rounded-lg shadow-2xl">
          {file && (
            <div className="flex flex-col gap-5 items-start h-[100%] p-5">
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Name:</span> <span>{file.name}</span>
              </p>
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Size:</span> <span>{file.size}</span>
              </p>
              <p className="flex justify-between w-[100%] border-2 border-dashed p-1">
                <span>File Type:</span> <span>{file.type}</span>
              </p>
              <img src={fileURL} alt="Preview" height={170} width={170} className="rounded-md" />
            </div>
          )}
        </div>
      </section>
      <section className="w-[100%] bg-[#2ecc71] text-white rounded-lg">
        <button className="w-[100%] p-2" onClick={upload}>Upload File</button>
        {fileCID && (
          <div className="cid-display">
            <p>File CID: <span>{fileCID}</span></p>
            <button onClick={() => navigator.clipboard.writeText(fileCID)}>Copy CID</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default FileUpload;