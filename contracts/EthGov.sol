// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EthGov{
	uint minGas = 1000000;

	mapping(address=>address) hasVotedTo;
	mapping(address=>uint) public totalVotes;

	struct Cand{address addr; string name;}
	Cand[] public candidates;
	 

	Cand currentLeader;
	
	function candidateRegister(string memory myName) public {
		for(uint i = 0; i<candidates.length; i++){
			if(
			    msg.sender == candidates[i].addr || 
			    (keccak256(abi.encodePacked(candidates[i].name)) 
			        == keccak256(abi.encodePacked(myName))
		        )
	    	    ){
				return;
			}
		}
		candidates.push(Cand({addr: msg.sender, name: myName }));
	}

	function vote(address myCandidate) public{
		bool retStatus = true;
		for(uint i = 0; i<candidates.length; i++){
			if(myCandidate == candidates[i].addr){
				retStatus = false;
			}
		}
		if(retStatus){ return; }


		totalVotes[hasVotedTo[msg.sender]]--;
		totalVotes[myCandidate]++;
	}

	function claimChange() public{
		currentLeader = candidates[0];
		
		for(uint i = 0; i<candidates.length; i++){
			if(totalVotes[candidates[i].addr] > totalVotes[currentLeader.addr]){
			    currentLeader = candidates[i];
			}
		}
	}
	
	function giveWinner() public view returns (address, string memory){
	    return (currentLeader.addr, currentLeader.name);
	}
}