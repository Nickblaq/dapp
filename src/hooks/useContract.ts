import { useState, useEffect, useCallback } from "react";
import { BigNumber, ethers, Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {
IERC20__factory as IERC20Factory,
Presale__factory as PresaleFactory,
Holdings__factory as HoldingsFactory,
Presale,
Holdings
}from '../types'
// import { count } from "console";

const PresaleAddress: string = '0xD6e6379b3ac7A8a14910035fD888a463673E3d0f'
const HoldingsAddress: string = '0xead6519bbbd2fca4f6dfea81a9d4f06b55dece87'
const useContract = () => {
    const {library, account, active} = useWeb3React()
    const signer = library.getSigner(account)

    const [contract, setContract] = useState<{
        preSale: Presale | null;
        holdings: Holdings | null;
    }>({
        preSale: null,
        holdings: null
    })

    useEffect(() => {
        (async () => {
            const preSale = await PresaleFactory.connect(
                PresaleAddress,
                signer
            )

            const holdings = await HoldingsFactory.connect(
                HoldingsAddress,
                signer
            )

            setContract({
                preSale,
                holdings
            })
        })()
    },[library, signer])

    return contract;
}

// referralCount, refReward
export const useRefCount = () : BigNumber | undefined => {
    const {account} = useWeb3React()
    const { preSale} = useContract();

    const [value, setValue] = useState<BigNumber | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const count = await preSale?.referralCount(account)
            setValue(ethers.BigNumber.from(count)) 
        })()
    },[])
    return value
}


export const useRefReward = () : BigNumber | undefined => {
    const {account} = useWeb3React()
    const { preSale} = useContract();

    const [value, setValue] = useState<BigNumber | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const count = await preSale?.referralRewards(account)
            setValue(ethers.BigNumber.from(count)) 
        })()
    },[])
    return value
}


export const useBuy = () => {
    const {account} = useWeb3React()
    const { preSale} = useContract();

    return useCallback(
       async (ref:string, amount:BigNumber) => {
           const result = await preSale.buy(ref, {
               value: amount
           });
           return result
       },[]
    )
}


export const useClaim = () => {
    const { preSale} = useContract();

    return useCallback(
       async () => {
           const result = await preSale.withdrawEarnings();
           return result
       },[]
    )
}