// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EthGov{
	uint minGas = 1000000;

	mapping(address=>address) hasVotedTo;
	mapping(address=>uint) public totalVotes;

	struct Cand{address addr; string name;}
	Cand[] public candidates;
	mapping(address=>bool) isCandidate;
	 

	Cand currentLeader;
	
	function candidateRegister(string memory myName) public {
		if(isCandidate[msg.sender]){
			return;
		}
		
		candidates.push(Cand({addr: msg.sender, name: myName }));
		isCandidate[msg.sender] = true;
	}

	function vote(address myCandidate) public{
		bool retStatus = true;
		if(!isCandidate[myCandidate]){
			return;
		}

		if(totalVotes[hasVotedTo[msg.sender]] > 0){
			totalVotes[hasVotedTo[msg.sender]]--;
		}
		totalVotes[myCandidate]++;

		hasVotedTo[msg.sender] = myCandidate;
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