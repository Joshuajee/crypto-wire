import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import tokenABI from "./abi.json";
import { providerOptions } from "./config";
import WalletConnectProvider from "@walletconnect/web3-provider";



    
export async function checkConnectedWalletExist() {

    try {

        if (typeof window?.ethereum !== 'undefined') {

            const { ethereum } = window;

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) return accounts[0];

            return null;

        } else {
            const provider = await walletConnect()

            const accounts = await provider.getSigner().getAddress();

            return accounts

        }

    } catch (e) {
        console.log(e)
        return null
    }

}



export async function connect() {

    try {

        if (typeof window?.ethereum !== 'undefined') {

            const web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions: providerOptions  as any // required
            });
            

            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const accounts = await provider.getSigner().getAddress();

        } else {

            const provider = await walletConnect()

            const accounts = await provider.getSigner().getAddress();

            console.log(accounts)

        }

    } catch (error) {
        console.error(error);
    }
    
}

export async function transfer(tokenAddress: string, to: string, amount: number){

    const ABI = tokenABI

    const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        //cacheProvider: true, // optional
        disableInjectedProvider: false,
        providerOptions: providerOptions as any, // required
    });

    // const instance = await web3Modal.connectTo("walletconnect");
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const currentContract = new ethers.Contract(
        tokenAddress,
        ABI,
        signer
    );

    const result = await currentContract.transfer(to, ethers.utils.parseEther(String(amount)));

    return result

}



export async function balanceOf(tokenAddress: string, address: string){

    const ABI = tokenABI

    const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        //cacheProvider: true, // optional
        disableInjectedProvider: false,
        providerOptions: providerOptions as any, // required
    });

    // const instance = await web3Modal.connectTo("walletconnect");
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const currentContract = new ethers.Contract(
        tokenAddress,
        ABI,
        signer
    );

    const result = await currentContract.balanceOf(address);

    return parseInt(result._hex, 16) / (10 ** 18)
}

export const walletConnect = async () => {

    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_API_KEY,
    });

    // //  Enable session (triggers QR Code modal)
    await provider.enable();


    const web3Provider = new providers.Web3Provider(provider);

    return web3Provider
  
  
}


