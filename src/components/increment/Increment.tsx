import React, { useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { InMemorySigner, importKey } from '@taquito/signer';

const contractAddress: string = "KT1K1o7Uep1ChtgcPKRSQBxJ746jfW5T46NX";
const Tezos: TezosToolkit = new TezosToolkit('https://rpc.ghostnet.teztnets.xyz/');

Tezos.setProvider({
    signer: new InMemorySigner('edskSAVwYbWa14GAS7hW5VzdCgpHbEBwUfRzRRDds55i21JC9WRvJiT3yPyyC39GWWbkbiRaUNRiF9vyBWBc3a9iozfUJX47rz'),
  });

function Increment() {

    const [contract, setContract] = useState<any>();
    const [counter, setCounter] = useState<number>();

    useEffect(() => {
        (async () => {

            Tezos.contract
            .at(contractAddress)
            .then((c) => {
                setContract(c);
                let methods = c.parameterSchema.ExtractSignatures();
                console.log(JSON.stringify(methods, null, 2));
                update();
            })
            .catch((error) => console.log(`Error: ${error}`));
                
        })();
    }, []);

    const update = async(): Promise<void> => {

        Tezos.contract
        .at(contractAddress)
        .then((contract) => {
            contract.storage()
            .then( (storage: any) => {
                console.log(storage.c[0]);
                setCounter(storage.c[0]);
            })
        })
        .catch((error) => console.log(`Error: ${error}`));

    }

    const incr = async(): Promise<void> => {
        console.log("call increment")
        contract.methods.increment(1).send()
        .then((op: { hash: any; confirmation: (arg0: number) => Promise<any>; }) => {
            console.log(`Waiting for ${op.hash} to be confirmed...`);
            return op.confirmation(3).then(() => op.hash);
          })
          .then((hash: any) => { 
            console.log(`Operation injected: https://ghost.tzstats.com/${hash}`) 
            update();
            })
          .catch((error: any) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    }

    const decr = async(): Promise<void> => {
        console.log("call decrement")
        contract.methods.decrement(1).send()
        .then((op: { hash: any; confirmation: (arg0: number) => Promise<any>; }) => {
            console.log(`Waiting for ${op.hash} to be confirmed...`);
            return op.confirmation(3).then(() => op.hash);
          })
          .then((hash: any) => { 
            console.log(`Operation injected: https://ghost.tzstats.com/${hash}`) 
            update();
            })
          .catch((error: any) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    }

    const reset = async(): Promise<void> => {
        console.log("call reset")
        contract.methods.reset().send()
        .then((op: { hash: any; confirmation: (arg0: number) => Promise<any>; }) => {
            console.log(`Waiting for ${op.hash} to be confirmed...`);
            return op.confirmation(3).then(() => op.hash);
          })
          .then((hash: any) => { 
            console.log(`Operation injected: https://ghost.tzstats.com/${hash}`) 
            update();
            })
          .catch((error: any) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Increment
                </Card.Title>
                <div>Counter: {counter}</div>
                <Button variant="primary" onClick={decr}>-</Button>
                <Button variant="primary" onClick={incr}>+</Button>
                <Button variant="primary" onClick={reset}>Reset</Button>
            </Card.Body>
        </Card>
    )
}

export default Increment;