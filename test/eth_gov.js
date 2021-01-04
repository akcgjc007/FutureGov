const assert = require('assert');

const ganache = require('ganache-cli');
const Web3 =  require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const fs = require('fs-extra');
const compiledFile = require('./../build/EthGov.json');


let accounts;
let instance;
const minGas = '1000000';

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    
    instance = await new web3.eth.Contract(compiledFile.abi)
    .deploy({ data: compiledFile.evm.bytecode.object })
    .send({ from: accounts[0], gas: minGas });

});


describe('EthGov', ()=>{
    it('is correctly deploying on the network.', async()=>{
        // assert(instance);

        
    });
});