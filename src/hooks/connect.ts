import { useState } from "react";

export const useConnectWallet = async () => {

    const [_provider, setProvider] = useState(null)
    const [_liberay, setLibrary] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [accounts, setAccount] = useState(null)


    
    try {
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
};