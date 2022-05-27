import {useState, useEffect, Fragment,} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

import { injected, walletconnect, POLLING_INTERVAL } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import logger from "../logger";
// import { Header } from "./Header";
// import Account from "./Account";
// import { useRefCount, useRefReward } from "../hooks";
// import Presale from "../abi/Presale.json";
// import { Contract } from "ethers";
function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    }
    if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    }
    if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
      return "Please authorize this website to access your Ethereum account.";
    }
    logger.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
  const PresaleAddress: string = '0xD6e6379b3ac7A8a14910035fD888a463673E3d0f'


export default function Navbar() {

  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;
  const disabled = !triedEager || !!activatingConnector || connected(injected) || connected(walletconnect) || !!error;
    // const {provider} = useWeb3Modal()
    let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [isShowNav, sethowNav] = useState(false)
    const [signerAddress, setSignerAddress] = useState("");
    // useEffect(() => {
    //     if (provider === null) return;
    //     const getAddress = async () => {
    //       const signer = provider.getSigner();
    //       const address = await signer.getAddress();
    //       setSignerAddress(address);
    //     }
    //     if (provider) getAddress();
    //     else setSignerAddress("");
    //   }, [provider]);

    const pr =(e)=> {
        e.preventDefault()
        sethowNav(!isShowNav)
        router.push('/presale')

    }
    

    return (
        <>
         <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Please connect wallet
                  </Dialog.Title>
                  <div className='mt-2'>
                  <div className="mt-2">
                    <div className=''>
                        <button 
                       className='px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer mx-auto'
                        onClick={() => {
                            setActivatingConnector(injected);
                            activate(injected);
                          }}
                        >
                            Metamask</button>

                        <button 
                           type="button"
                           className='px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer mx-auto'
                           onClick={() => {
                             setActivatingConnector(walletconnect);
                             activate(walletconnect);
                           }}>
                            
                            Wallet Connect</button>
                    </div>
                  </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    <div className="sticky z-40 w-screen border-b py-5 px-6 bg-white dark:bg-gray-800 flex border-gray-300 dark:border-gray-600 items-center h-20 justify-between top-0 mb-30">
        <div className="w-full flex items-center">
            <div className="flex items-center justify-start flex-1">
                <a href="/" className="flex items-center pr-2" aria-current="page">
                    <img className="h-10" src="logo.svg" />
                </a>
                <p className='mr-6 text-gray-600 dark:text-white text-xl font-serif font-bold'>chase</p>
        <div className="hidden md:flex w-full items-center">
            {/* <div className="flex relative items-center w-full max-w-xl flex-shrink">
                <input className="border-2 h-12 md:h-10 rounded-xl bg-inherit border-gray-300 dark:border-gray-600 p-2 px-4 w-full text-sm max-w-xl outline-none focus:border-gray-500" placeholder="Search items, collections, and profiles" data-v-a3b308de="" />
            </div> */}
            <Link href='/presale'>
            <div className=" ml-8 font-dmsans font-bold text-gray-600 dark:text-white" aria-current="page">Presale</div>
            </Link>
                {/* <a href="/" className=" ml-8 font-dmsans font-bold text-gray-600 dark:text-white" aria-current="page">Vaults <span className='text-yellow-200'>coming soon</span></a> */}
                <a href="/" className=" ml-8 font-dmsans font-bold text-gray-600 dark:text-white" aria-current="page">Twitter</a>
                <a target="_blank" href="https://t.me/+bXvcAowgPaNlZjcx" rel="noopener noreferrer" className='ml-8 mr-8 font-dmsans font-bold text-gray-600 dark:text-white'>Telegram</a>
        </div>
        </div>
        <div className="flex items-center border-0 border-r pr-4 border-gray-300 dark:border-gray-600">
           <p className='text-gray-600 dark:text-white'>Price: 5000/1BNB</p>
           <div className="cursor-pointer ml-4"
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
           >
               {theme === 'light' ?
               <img className="w-5 h-5" src="moon.svg" alt="" /> 
               :
               <img className="w-5 h-5" src="sun.svg" alt="" />
            }
               </div>
               
               {/* <div className='ml-4'>
                   {signerAddress}
               </div> */}
               {/* <span  aria-expanded="false">
                   <img className="ml-4 cursor-pointer hover:fill-gray-700" src="help.svg" />
                   </span> */}
                   </div>
                   <div className=" items-center hidden md:flex">
                       <div onClick={(() => {sethowNav(!isShowNav)})} className="flex-shrink-0 ml-4">
                       {!account ? (
                            <button 
                            onClick={openModal}
                            className="md:px-3 md:border-2 p-0.5 md:h-10 md:bg-inherit md:border-gray-300 md:dark:border-gray-600 md:rounded-xl md:hover:border-gray-500 md:hover:shadow md:text-sm md:font-bold font-dmsans md:text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 font-semibold flex items-center justify-center rounded-lg  hover:bg-blue-200 hover:dark:bg-blue-600 md:hover:dark:bg-gray-600  w-full text-center cursor-pointer bg-blue-800  text-white">
                            Connect
                          </button>
                       ): (
                        <span>
                        {account === null
                          ? "-"
                          : account
                          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                          : ""}
                      </span>
                       )}
                      
                        {/* <div className="border-2 p-0.5 h-10 border-gray-300 dark:border-gray-600 cursor-pointer rounded-xl flex justify-center items-center hover:border-gray-500 hover:shadow text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 "> Connect Wallet </div> */}
                        </div>
                        </div>
                        {/* <div className="relative flex-shrink-0">
                            <img className="ml-4 mr-4 w-8 h-8 cursor-pointer" src="" />
                            </div> */}
                            <div onClick={(() => {sethowNav(!isShowNav)})} className='flex items-center md:hidden pl-6 pr-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 lg:hidden select-none cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </div>

    

    {isShowNav && 
    <div className="overflow-y-auto md:hidden fixed bg-white dark:bg-gray-800 duration-500 top-20 right-0 w-full  border-gray-300 dark:border-gray-600 z-45" >
        <div className="w-full pt-4 px-4 flex flex-col items-start" >
        {/* <div className="font-semibold md:hidden text-2xl w-full text-left" >
            <div className="flex relative items-center" >
                <input className="border-2 h-12 md:h-10 rounded-xl bg-inherit border-gray-300 dark:border-gray-600 p-2 px-4 w-full text-sm max-w-xl outline-none focus:border-gray-500" placeholder="Search items, collections, and profiles"  />
                </div>
                </div> */}
                <div className="w-full mt-4 py-4 inner-height overflow-y-auto" >
                    <div className="w-full" >
                        <a aria-current="page" href="/" className="router-link-active router-link-exact-active flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-800 dark:text-white"  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
</svg>                      
                            <div className='flex space-x-2' onClick={(() => {sethowNav(!isShowNav)})}>
                                <Link   href='/presale'>
                            <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white">Presale</div>
                            </Link>
                            </div>
                            
                            </a>
                            <a href="/" className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer" >
                                <img className="mr-2 w-5 text-white" src="/gem.svg"  />
                            <div className='flex space-x-2'>
                                <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white" >Explore</div>
                                <span className='text-yellow-300 text-sm font-mono'>Coming Sooon</span>
                            </div>
                            </a>
                                <hr className="dark:border-gray-600 border-gray-300"  />
                                    <a href="" target="_blank" className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer" >
                                        <img className="mr-2" src="/request.svg"  />
                                        <div className='flex space-x-2'>
                                        <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white" >Request Features</div>
                                        <span className='text-yellow-300 text-sm font-mono'>Coming Sooon</span>
                                        </div>
                                        </a>
                                        <div className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer relative"  >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 dark:text-white text-gray-800"  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
</svg>                                      
                                             <div className='flex space-x-2' onClick={(() => {sethowNav(!isShowNav)})}>
                                            <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white" >Twitter</div>
                                            {/* <span className='text-yellow-300 text-sm font-mono'>Coming Sooon</span> */}
                                        </div>
                                        
                                            <div className="Canny_BadgeContainer"><div className="Canny_Badge"></div>
                                            </div>
                                            </div>

                                            <div className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer relative"  >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 dark:text-white text-gray-800"  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
</svg>                                      
                                             <div className='flex space-x-2' onClick={(() => {sethowNav(!isShowNav)})}>
                                            <a target="_blank" href="https://t.me/+bXvcAowgPaNlZjcx" rel="noopener noreferrer" className='text-sm font-bold font-dmsans text-gray-600 dark:text-white'>Telegram</a>
                                        </div>
                                        
                                            <div className="Canny_BadgeContainer"><div className="Canny_Badge"></div>
                                            </div>
                                            </div>


                                            {/* <a href="" target="_blank" className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer">
                                                <img className="mr-2" src="/discord.svg"  />
                                                <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white">Discord</div>
                                            </a>
                                                <a href="" target="_blank" className="flex items-left py-4 hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer" >
                                                    <img className="mr-2" src="/twitter.svg"  />
                                                    <div className="text-sm font-bold font-dmsans text-gray-600 dark:text-white">Twitter</div>
                                                </a> */}
                                                    </div>
                                                    {/* <button className="mt-4 h-12 font-semibold flex items-center justify-center  rounded-lg hover:bg-blue-200 hover:dark:bg-blue-600 w-full text-center cursor-pointer bg-blue-800 text-white"> Connect Wallet </button> */}
                                                    <div onClick={(() => {sethowNav(!isShowNav)})}>
                                                    {!account ? (
                            <button 
                            onClick={openModal}
                            className="md:px-3 md:border-2 p-0.5 md:h-10 md:bg-inherit md:border-gray-300 md:dark:border-gray-600 md:rounded-xl md:hover:border-gray-500 md:hover:shadow md:text-sm md:font-bold font-dmsans md:text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 font-semibold flex items-center justify-center rounded-lg  hover:bg-blue-200 hover:dark:bg-blue-600 md:hover:dark:bg-gray-600  w-full text-center cursor-pointer bg-blue-800  text-white">
                            Connect
                          </button>
                       ): (
                        <span>
                        {account === null
                          ? "-"
                          : account
                          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                          : ""}
                      </span>
                       )}
                                                    </div>
                                                   
                                            </div>
                                            </div>
                                            </div>
    }

    
                            </div>

                            </div>
    </>
);

}