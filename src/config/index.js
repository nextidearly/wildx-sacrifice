import { BIG_TEN } from "utils/bigNumber";
import BigNumber from "bignumber.js";

export const BASE_URL = "localhost:3000/swap";
export const ALCHEMY_ID = "86wTK178jC4XNO9sh-iVI7P5fV1tg_Dx";

export const CHAIN_ID = 8453;
export const TESTNET_CHAIN_ID = 84531;

export const DEFAULT_GAS_LIMIT = 2000000;
export const DEFAULT_GAS_PRICE = 2;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const NUMBER_OF_FARMS_VISIBLE = 12;
export const wildWethFarmPid = 2;
export const wethUsdcFarmPid = 3;
export const YEAR = 60 * 60 * 24 * 365;
export const YEAR_BN = new BigNumber(YEAR);

export const BASE_EXCHANGE_URL_BY_CHAIN = {
  84531: "https://goerli.basescan.org/",
  8453: "https://pancakeswap.finance/",
};

export const BASE_EXCHANGE_URL = BASE_EXCHANGE_URL_BY_CHAIN[CHAIN_ID];

export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/liquidity`;
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`;
export const ARCHIVED_NODE = "https://developer-access-mainnet.base.org";

// export const YEAR = 60 * 60 * 24 * 365
// export const YEAR_BN = new BigNumber(YEAR)

export const routes = [
  {
    name: "Farm",
    url: "/farms",
  },
  {
    name: "Swap",
    url: "/swap",
  },
  {
    name: "Liquidity",
    url: "/liquidity",
  },
];
