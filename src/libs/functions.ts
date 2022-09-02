import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import tokenABI from "./abi.json";
import { providerOptions } from "./config";


export async function transfer(tokenAddress: string, to: string, amount: number){

    const ABI = tokenABI

    const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions // required
      });
      

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

    const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions // required
    });
      
    const ABI = tokenABI

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

