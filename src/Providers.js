import React from "react";
import { ToastContainer } from "react-toastify";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import ContractContextProvideer from "context/contracts";
import { ThemeContextProvider } from "context/ThemeContext";
import { LanguageProvider } from "context/Localization";
import { ModalProvider } from "uikit";

import { ALCHEMY_ID } from "config";

const Providers = ({ children }) => {
  const { chains, publicClient } = configureChains(
    [base],
    [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "wildbase.fram",
    projectId: "85ea32d265dfc865d0672c8b6b5c53d2",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ThemeContextProvider>
          <LanguageProvider>
            <ContractContextProvideer>
              <ModalProvider>{children}</ModalProvider>
            </ContractContextProvideer>
          </LanguageProvider>
        </ThemeContextProvider>
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
