const assert = require('assert');
const anchor = require("@project-serum/anchor");
const {SystemProgram}=anchor.web3;

describe('mycalcdapp',()=>{
    const provider = anchor.Provider.local();
    anchor.setProvider(provider)

    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.mycalcdapp;

    it('Create a calculator',async()=>{
        await program.rpc.create("Welcome to Solana",{
            accounts : {
                calculator:calculator.publickey,
                user: provider.wallet.publickey,
                systemProgram: SystemProgram.programId,
            },
            signers :[calculator]
        });

        const account = await program.account.calculator.fetch(calculator.publickey);
        assert.ok(account.greeting === "Welcome to Solana");
        _calculator =calculator;

    });

    it('Adds two number',async function(){
        const calculator = _calculator;

        await program.rpc.add(new anchor.BN(2),new anchor.BN(3),{
            accounts:{
                calculator:calculator.publickey,
            }
        });

        const account = await program.account.calculator.fetch(calculator.publickey);
        assert.ok(account.result.eq(new anchor.BN(5)));
        assert.ok(account.greeting === "Welcome to Solana");

    });

    it('Mutiply two number',async function(){
        const calculator = _calculator;

        await program.rpc.multiply(new anchor.BN(2),new anchor.BN(3),{
            account:{
                calculator:calculator.publickey,
            }
        });

        const account = await program.account.calculator.fetch(calculator.publickey);
        assert.ok(account.result.eq(new anchor.BN(6)));
        assert.ok(account.greeting =="Welcome to Solana");

    });

    it('Subtracts two number',async function(){
        const calculator = _calculator;

        await program.rpc.subtract(new anchor.BN(7),new anchor.BN(3),{
            account:{
                calculator:calculator.publickey,
            }
        });

        const account = await program.account.calculator.fetch(calculator.publickey);
        assert.ok(account.result.eq(new anchor.BN(4)));
        assert.ok(account.greeting =="Welcome to Solana");

    });

    it('Divide two number',async function(){
        const calculator = _calculator;

        await program.rpc.multiply(new anchor.BN(10),new anchor.BN(5),{
            account:{
                calculator:calculator.publickey,
            }
        });

        const account = await program.account.calculator.fetch(calculator.publickey);
        assert.ok(account.result.eq(new anchor.BN(5)));
        assert.ok(account.remainder.eq(new anchor.BN(0)));
        assert.ok(account.greeting == "Welcome to Solana");
    })

})