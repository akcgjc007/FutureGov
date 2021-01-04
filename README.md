# Future Gov
<img width="600" src="./__sample/a.jpg">

## Intro
**FutureGov** is a governance system which allows users to control their governance from their ethereum wallet. They can pay some fee and change their vote any time by paying the minimal transaction fee. After voting for a candidate, anyone can claim for governance change, which will then calculate if their needs to be a change of governance.

## Features
 - Allows candidates to register
 - Allows users to vote 
 - Allows users to **switch their vote any number of times**
 - Allows anyone to ask for *governance change* claim

## Solidity Contract
```
contract FutureGov{
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
  futuregov
    ✓ is correctly deployed on ganache-cli test network.
107343
    ✓ allows candidates to register. (64ms)
    ✓ does't allow a candidate to register twice. (98ms)
    ✓ allows users to vote. (125ms)
    ✓ allows users to switch their vote. (137ms)
    ✓ does't allow users to vote invalid candidate (87ms)
    ✓ allow users to claim for governance change. (153ms)
    ✓ allows users to switch their vote. (223ms)
Gas for candidate register:  107427
Gas for candidate register:  92427
    ✓ consumes gas for candidate registration. (57ms)
Gas for voting:  66757
Gas for voting:  43732
Gas for voting:  43732
Gas for voting:  43732
Gas for voting:  43732
Gas for voting:  43732
Gas for voting:  43732
Gas for voting:  31132
Gas for voting:  31132
Gas for voting:  31132
    ✓ consumes gas for voting. (352ms)


  10 passing (2s)

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
