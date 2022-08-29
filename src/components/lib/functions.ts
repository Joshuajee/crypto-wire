import { ethers } from "ethers";
import Web3Modal from "web3modal";
import tokenABI from "./abi.json";
import { providerOptions } from "./config";


export  async function connectWallet() {

    if (typeof window !== 'undefined') {

        try {

            const { ethereum } = window;
            
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            //this.currentAccount = accounts[0];

        } catch (error) {
            console.log(error);
        }

    }

}

    
export async function checkConnectedWalletExist() {

    if (typeof window !== 'undefined') {
      
        try {

            const { ethereum } = window;

            if (!ethereum) return undefined;           

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) return accounts[0];
  
            return null;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

}

export async function connect() {

    if (typeof window !== 'undefined') {

        try {

            const web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions: providerOptions  as any // required
            });
            

            // const instance = await web3Modal.connectTo("walletconnect");
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const accounts = await provider.getSigner().getAddress();


        } catch (error) {
            console.error(error);
        }

    }
    
}

export async function transfer(tokenAddress: string, to: string, amount: number){
    // const provider = new ethers.providers.JsonRpcProvider(
    //   "https://polygon-mumbai.g.alchemy.com/v2/C1ubMKQmO35l6oZPGepgu7DBraYGtg9U"
    // );
    // const signer = provider.getSigner();
    //const network = await provider.getNetwork();
    //console.log(network);

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

    //const result = await currentContract.symbol();

    const result = await currentContract.transfer(to, amount);
    console.log(result);

    return result

}
