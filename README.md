# EthGov
## Intro
**EthGov** is a governance system which allows users to control their governance from their ethereum wallet. They can pay some fee and change their vote any time by paying the minimal transaction fee. After voting for a candidate, anyone can claim for governance change, which will then calculate if their needs to be a change of governance.

## Features
 - Allows candidates to register
 - Allows users to vote 
 - Allows users to **switch their vote anytime**
 - Allows anyone to ask for *governance change* claim

## Solidity Contract
```
contract EthGov{
	mapping(address=>address) hasVotedTo;
	mapping(address=>uint) public totalVotes;

	struct Cand{address addr; string name;}
	Cand[] public candidates;

	Cand currentLeader;
	
	function candidateRegister(string memory myName) public{}
	function vote(address myCandidate) public{}
	function claimChange() public{}
	function giveWinner() public view returns (address, string memory){}

}
```

## Mocha tests
```
  EthGov
    ✓ is correctly deployed on ganache-cli test network.
    ✓ allows candidates to register. (58ms)
    ✓ does't allow a candidate to register twice. (85ms)
    ✓ allows users to vote. (121ms)
    ✓ allows users to switch their vote. (133ms)
    ✓ does't allow users to vote invalid candidate (97ms)
    ✓ allow users to claim for governance change. (158ms)
    ✓ allows users to switch their vote. (212ms)


  8 passing (1s)
```

## Contributors
<table><tr><td align="center">
        <a href="https://github.com/akcgjc007">
            <img src="https://avatars2.githubusercontent.com/u/56300182" width="100;" alt="anupam"/>
            <br />
            <sub><b>Anupam Kumar</b></sub>
        </a>
    </td></tr>
</table>
