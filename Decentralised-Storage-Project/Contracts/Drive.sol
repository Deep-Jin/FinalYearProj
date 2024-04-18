// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

contract Drive {
    struct File {
        string cid;
        address owner;
        mapping(address => bool) hasAccess;
    }

    mapping(string => File) private files;
    // This mapping handles access control separately
    mapping(string => mapping(address => bool)) private fileAccess;
    mapping(address => string[]) private ownedFiles;
    string[] private allFiles;

    event FileUploaded(address indexed owner, string cid);
    event FileAccessGranted(string indexed cid, address indexed grantee);
    event FileAccessRevoked(string indexed cid, address indexed grantee);

    // Upload a file to the contract 
    function upload(string memory cid) external {
        require(bytes(files[cid].cid).length == 0, "CID already registered");
        
        File storage newFile = files[cid];
        newFile.cid = cid;
        newFile.owner = msg.sender;
        
        fileAccess[cid][msg.sender] = true;
        
        ownedFiles[msg.sender].push(cid);
        allFiles.push(cid);
        emit FileUploaded(msg.sender, cid);
    }

    // Grant access to a file
    function grantAccess(string memory cid, address grantee) external {
        require(msg.sender == files[cid].owner, "Only the owner can grant access");
        files[cid].hasAccess[grantee] = true;
        emit FileAccessGranted(cid, grantee);
    }

    // Revoke access to a file
    function revokeAccess(string memory cid, address grantee) external {
        require(msg.sender == files[cid].owner, "Only the owner can revoke access");
        files[cid].hasAccess[grantee] = false;
        emit FileAccessRevoked(cid, grantee);
    }

    // Check if a user has access to a file
    function hasAccess(string memory cid, address user) public view returns (bool) {
        return files[cid].hasAccess[user];
    }

    // Get the list of files owned by a user
    function getOwnedFiles(address user) external view returns (string[] memory) {
        return ownedFiles[user];
    }
}