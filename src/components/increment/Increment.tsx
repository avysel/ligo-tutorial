import React from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { useEffect } from 'react';

const contractAddress: string = "KT1K1o7Uep1ChtgcPKRSQBxJ746jfW5T46NX";
const Tezos: TezosToolkit = new TezosToolkit('https://rpc.ghostnet.teztnets.xyz/');

function Increment() {

    useEffect(() => {
        (async () => {

            Tezos.contract
            .at(contractAddress)
            .then((c) => {
                let methods = c.parameterSchema.ExtractSignatures();
                console.log(JSON.stringify(methods, null, 2));
            })
            .catch((error) => console.log(`Error: ${error}`));
                
        })();
    }, []);


    return (
        <>
        Increment
        </>
    )
}

export default Increment;