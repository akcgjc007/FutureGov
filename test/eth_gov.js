const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 =  require('web3');

const options = { gasLimit: 10000000, a: 10 };
const provider = ganache.provider(options);

const web3 = new Web3(provider);

const compiledFile = require('./../build/EthGov.json');


let accounts;
const minGas = '1000000';
let instance;
let ethgov;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    
    instance = await new web3.eth.Contract(compiledFile.abi)
    .deploy({ data: compiledFile.evm.bytecode.object })
    .send({ from: accounts[0], gas: '10000000'});

    ethgov = instance.methods;

});



describe('EthGov', ()=>{
    it('is correctly deployed on ganache-cli test network.', async()=>{
        assert.ok(await instance.options.address);
    });
    
    it('allows candidates to register.', async()=>{
        await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
    });

    it('does\'t allow a candidate to register twice.', async()=>{
        try {
            await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
            await ethgov.candidateRegister("John Bro").send({from: accounts[0]});    
            
            assert(false);
        } catch (err) {
            
        }
    });

    it('allows users to vote.', async()=>{
        await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
        await ethgov.candidateRegister("Dohn Joe").send({from: accounts[1]});
        
        await ethgov.vote(accounts[0]).send({from: accounts[0]});
    });
    
    it('allows users to switch their vote.', async()=>{
        await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
        await ethgov.candidateRegister("Dohn Joe").send({from: accounts[1]});    
        
        await ethgov.vote(accounts[0]).send({from: accounts[2]});
        await ethgov.vote(accounts[1]).send({from: accounts[2]});
    });

    it('does\'t allow users to vote invalid candidate', async()=>{
        try {
            await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
            await ethgov.candidateRegister("Dohn Joe").send({from: accounts[1]});    
            await ethgov.vote(accounts[3]).send({from: accounts[2]});
            assert(false);
        } catch (err) {
            
        }
    });

    it('allow users to claim for governance change.', async()=>{
        await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
        await ethgov.candidateRegister("Dohn Joe").send({from: accounts[1]});    
        await ethgov.vote(accounts[0]).send({from: accounts[0]});

        await ethgov.claimChange().send({from: accounts[0]});
        
        const x = await ethgov.giveWinner().call();
        // console.log(x);
    });

    it('allows users to switch their vote.', async()=>{
        await ethgov.candidateRegister("John Doe").send({from: accounts[0]});    
        await ethgov.candidateRegister("Dohn Joe").send({from: accounts[1]});    
        
        
        await ethgov.vote(accounts[0]).send({from: accounts[0]});
        
        await ethgov.claimChange().send({from: accounts[0]});
        const a = await ethgov.giveWinner().call();
        // console.log(a['1']);
        // console.log("Votes for A: ", await ethgov.totalVotes(accounts[0]).call());
        // console.log("Votes for B: ", await ethgov.totalVotes(accounts[1]).call());
        
        
        
        await ethgov.vote(accounts[1]).send({from: accounts[0]});
        
        await ethgov.claimChange().send({from: accounts[0]});
        const b = await ethgov.giveWinner().call();
        // console.log(b['1']);
        // console.log("Votes for A: ", await ethgov.totalVotes(accounts[0]).call());
        // console.log("Votes for B: ", await ethgov.totalVotes(accounts[1]).call());
    });

    





});