import tokens from "./tokens";

export const liquidityList = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wild.address,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: "",
  },
  {
    pid: 0,
    lpSymbol: tokens.eth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.eth.address,
    decimals: 18,
    logoA: tokens.eth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.weth.address,
    decimals: 18,
    logoA: tokens.weth.logo,
    logoB: "",
  },
];

export const zapList = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wild.address,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: "",
  },
  {
    pid: 0,
    lpSymbol: tokens.eth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.eth.address,
    decimals: 18,
    logoA: tokens.eth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.weth.address,
    decimals: 18,
    logoA: tokens.weth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: "WETH-WILDX",
    isTokenOnly: false,
    lpAddresses: "0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb",
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: tokens.eth.logo,
  },
];

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: "0xbCDa0bD6Cd83558DFb0EeC9153eD9C9cfa87782E",
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: "/images/tokens/wildx.svg",
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: "0x4200000000000000000000000000000000000006",
    token: tokens.weth,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "",
  },
  {
    pid: 2,
    lpSymbol: "WETH-WILDX",
    lpAddresses: "0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb",
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/wildx.svg",
    logoB: "/images/tokens/weth.svg",
  },
  {
    pid: 3,
    lpSymbol: "WETH-USDC",
    lpAddresses: "0x79474223AEdD0339780baCcE75aBDa0BE84dcBF9",
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "/images/tokens/usdc.svg",
  },
];

export default farmsConfig;
