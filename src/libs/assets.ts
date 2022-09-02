interface ASSET {
    name: string;
    symbol: string;
    address: string;
    airdropAddress?: string;
}


export type CHAIN_ID = 1 | 56 | 137 | 80001


export const ethereum : Array<ASSET> = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
        name: "USD Tether",
        symbol: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    }
]


export const bsc : Array<ASSET> = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
    },
    {
        name: "USD Tether",
        symbol: "USDT",
        address: "0x55d398326f99059ff775485246999027b3197955"
    }
]

export const polygon : Array<ASSET> = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    },
    {
        name: "USD Tether",
        symbol: "USDT",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
    }
]

export const mumbai : Array<ASSET> = [
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0xe11a86849d99f524cac3e7a0ec1241828e332c62"
    },
    {
        name: "Joshuajee",
        symbol: "JEE",
        address: "0x97b981371465A1fd000eD2A71d66f2C875a65Bc4"
    },
    {
        name: "USD Tether",
        symbol: "USDT",
        address: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832"
    }
]
 


