import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaAngleDown } from "react-icons/fa";
import { usePriceWILDXUsdc } from "state/hooks";
export const WalletConnect = () => {
  const priceData = usePriceWILDXUsdc();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bt-yellow-main btn_connect m-2 sm:m-0 hover:bg-hover bg-orange transition ease-in-out"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bt-yellow-main btn_connect m-2 sm:m-0 hover:bg-red-500 bg-red-600  transition ease-in-out text-[white!important] flex justify-center items-center gap-1"
                  >
                    Wrong network
                    <FaAngleDown className="text-xl" />
                  </button>
                );
              }
              return (
                <div className="flex items-center">
                  <button
                    onClick={openAccountModal}
                    className="bt-yellow-main btn_connect m-2 sm:m-0 hover:bg-hover bg-orange transition ease-in-out flex justify-center items-center gap-1"
                    type="button"
                  >
                    {account.displayName}
                    <FaAngleDown className="text-xl" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
