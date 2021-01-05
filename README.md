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

## to-do 
 - Security vulnerability testing

## Securify2 test results:
```
Severity:    LOW
Pattern:     External Calls of Functions
Description: A public function that is never called within the
             contract should be marked as external
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        17
Source: 
> 
>     function setCallee(address newCallee) public onlyOwner {
>     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>         callee = newCallee;


Severity:    LOW
Pattern:     External Calls of Functions
Description: A public function that is never called within the
             contract should be marked as external
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        21
Source: 
> 
>     function forward(bytes memory _data) public {
>     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>         callee.delegatecall(_data);


Severity:    INFO
Pattern:     Low Level Calls
Description: Usage of <address>.call should be avoided
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        22
Source: 
>     function forward(bytes memory _data) public {
>         callee.delegatecall(_data);
>         ^^^^^^^^^^^^^^^^^^^^^^^^^^
>     }


Severity:    MEDIUM
Pattern:     Missing Input Validation
Description: Method arguments must be sanitized before they are used
             in computations.
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        17
Source: 
> 
>     function setCallee(address newCallee) public onlyOwner {
>     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>         callee = newCallee;


Severity:    MEDIUM
Pattern:     Missing Input Validation
Description: Method arguments must be sanitized before they are used
             in computations.
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        21
Source: 
> 
>     function forward(bytes memory _data) public {
>     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>         callee.delegatecall(_data);


Severity:    INFO
Pattern:     State variables default visibility
Description: Visibility of state variables should be stated explicitly
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        4
Source: 
> contract UnrestrictedDelegateCall2 {
>     address callee;
>     ^^^^^^^^^^^^^^
>     address owner;


Severity:    INFO
Pattern:     State variables default visibility
Description: Visibility of state variables should be stated explicitly
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        5
Source: 
>     address callee;
>     address owner;
>     ^^^^^^^^^^^^^
> 


Severity:    CRITICAL
Pattern:     Unrestricted Ether Flow
Description: The execution of ether flows should be restricted to an
             authorized set of users.
Type:        Warning
Contract:    UnrestrictedDelegateCall2
Line:        22
Source: 
>     function forward(bytes memory _data) public {
>         callee.delegatecall(_data);
>         ^^^^^^^^^^^^^^^^^^^^^^^^^^
>     }


Severity:    MEDIUM
Pattern:     Unused Return Pattern
Description: The value returned by an external function call is never
             used
Type:        Violation
Contract:    UnrestrictedDelegateCall2
Line:        22
Source: 
>     function forward(bytes memory _data) public {
>         callee.delegatecall(_data);
>         ^^^^^^^^^^^^^^^^^^^^^^^^^^
>     }

```

## Vulnerabilities removed
 - Function visibility set to `external`.
 - Require statements added.