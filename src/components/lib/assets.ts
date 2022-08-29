interface ASSET {
    name: string;
    symbol: string;
    address: string;
    airdropAddress?: string;
}


export const assets: Array<ASSET> = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0xe11a86849d99f524cac3e7a0ec1241828e332c62"
    },
    {
        name: "@Joshuajee",
        symbol: "JEE",
        address: "0x97b981371465A1fd000eD2A71d66f2C875a65Bc4"
    }
]

//0x97b981371465A1fd000eD2A71d66f2C875a65Bc4