import { useState } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providerOptions } from "../libs/config";
import { toHex } from "../libs/utils";



export const useConnectWallet = () => {

    const [provider, setProvider] = useState<any>(null)
    const [library, setLibrary] = useState<any>(null)
    const [chainId, setChainId] = useState(1)
    const [accounts, setAccount] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    const connect = async () => {

        try {

            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions // required
            });
              

            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            if (accounts) setAccount(accounts[0]);
            setChainId(network.chainId);
        } catch (error) {
            setError(error);
        }

    }

    const getAccount = async () => {

        try {

            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions // required
            });
              
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            if (accounts) setAccount(accounts[0]);
            setChainId(network.chainId);

        } catch (error) {
            setError(error);
        }

    }
    
    return { connect, getAccount, accounts, chainId, library, error, provider }

};