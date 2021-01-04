const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 =  require('web3');

const maxAccounts = 10;
const maxGas = 1000000;
const options = { 
    gasLimit: maxGas, 
    a: maxAccounts, 
    default_balance_ether: 100
};
const provider = ganache.provider(options);

const web3 = new Web3(provider);

const compiledFile = require('./../build/FutureGov.json');


let accounts;   
let instance;
let fugov;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    
    instance = await new web3.eth.Contract(compiledFile.abi)
    .deploy({ data: compiledFile.evm.bytecode.object})
    .send({ from: accounts[0], gas: maxGas});

    fugov = instance.methods;
});



describe('futuregov', ()=>{
    it('is correctly deployed on ganache-cli test network.', async()=>{
        assert.ok(await instance.options.address);
    });
    
    it('allows candidates to register.', async()=>{
        var a = await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});   
        console.log(a.gasUsed);
        
    });

    it('does\'t allow a candidate to register twice.', async()=>{
        try {
            await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
            await fugov.candidateRegister("John Bro").send({from: accounts[0], gas: maxGas});    
            
            assert(false);
        } catch (err) {
            
        }
    });

    it('allows users to vote.', async()=>{
        await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
        await fugov.candidateRegister("Dohn Joe").send({from: accounts[1], gas: maxGas});
        
        await fugov.vote(accounts[0]).send({from: accounts[0], gas: maxGas});
    });
    
    it('allows users to switch their vote.', async()=>{
        await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
        await fugov.candidateRegister("Dohn Joe").send({from: accounts[1], gas: maxGas});    
        
        await fugov.vote(accounts[0]).send({from: accounts[2], gas: maxGas});
        await fugov.vote(accounts[1]).send({from: accounts[2], gas: maxGas});
    });

    it('does\'t allow users to vote invalid candidate', async()=>{
        try {
            await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
            await fugov.candidateRegister("Dohn Joe").send({from: accounts[1], gas: maxGas});    
            await fugov.vote(accounts[3]).send({from: accounts[2], gas: maxGas});
            assert(false);
        } catch (err) {
            
        }
    });

    it('allow users to claim for governance change.', async()=>{
        await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
        await fugov.candidateRegister("Dohn Joe").send({from: accounts[1], gas: maxGas});    
        await fugov.vote(accounts[0]).send({from: accounts[0], gas: maxGas});

        await fugov.claimChange().send({from: accounts[0], gas: maxGas});
        
        const x = await fugov.giveWinner().call();
        // console.log(x);
    });

    it('allows users to switch their vote.', async()=>{
        await fugov.candidateRegister("John Doe").send({from: accounts[0], gas: maxGas});    
        await fugov.candidateRegister("Dohn Joe").send({from: accounts[1], gas: maxGas});    
        
        
        await fugov.vote(accounts[0]).send({from: accounts[0], gas: maxGas});
        
        await fugov.claimChange().send({from: accounts[0], gas: maxGas});
        const a = await fugov.giveWinner().call();
        // console.log(a['1']);
        // console.log("Votes for A: ", await fugov.totalVotes(accounts[0]).call());
        // console.log("Votes for B: ", await fugov.totalVotes(accounts[1]).call());
        
        
        
        await fugov.vote(accounts[1]).send({from: accounts[0], gas: maxGas});
        
        await fugov.claimChange().send({from: accounts[0], gas: maxGas});
        const b = await fugov.giveWinner().call();
        // console.log(b['1']);

        // console.log("Votes for A: ", await fugov.totalVotes(accounts[0]).call());
        // console.log("Votes for B: ", await fugov.totalVotes(accounts[1]).call());
    });

    it('consumes gas for candidate registration.', async()=>{
        
        const gas1 = (await fugov.candidateRegister("Ram vinod bulla")
        .send({from: accounts[0], gas: maxGas})).gasUsed;
        const gas2 = (await fugov.candidateRegister("Ram vinod bulla")
        .send({from: accounts[1], gas: maxGas})).gasUsed;
        
        
        console.log("Gas for candidate register: ", gas1);
        console.log("Gas for candidate register: ", gas2);
    });

    it('consumes gas for voting.', async()=>{
        var totalGas = 0;

        await fugov.candidateRegister("John Doe")
        .send({from: accounts[0], gas: maxGas});
        await fugov.candidateRegister("Dohn Joe")
        .send({from: accounts[1], gas: maxGas});

        rand = ()=>Math.floor(Math.random()*100%2);

        for(var i = 0; i<maxAccounts; i++){
            const receipt = await fugov.vote(accounts[rand()])
            .send({from: accounts[0], gas: maxGas});    

            console.log("Gas for voting: ", receipt.gasUsed);
        }
    });
});