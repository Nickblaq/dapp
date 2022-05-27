import { useState, useEffect, useCallback } from "react";
import { BigNumber, ethers, Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Presale from '../abi/Presale.json'

const PresaleAddress: string = '0xD6e6379b3ac7A8a14910035fD888a463673E3d0f'
const HoldingsAddress: string = '0xead6519bbbd2fca4f6dfea81a9d4f06b55dece87'
export default function useContract (){
    const {library, account, active} = useWeb3React()
    const signer = library.getSigner(account)
    const [readContract, writeContract] = useState()

  const useContractWithoutSigner = async() => {
    const contract = await new Contract(PresaleAddress, Presale, library.getProvider())
    console.log(contract)
  }
}