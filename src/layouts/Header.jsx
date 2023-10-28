import React from "react";
import { WalletConnect } from "components/UI/ConnectButton";

export default function Header() {
  return (
    <div className="container mr-auto ml-auto relative my-8 px-6">
      <div className="flex justify-between">
        <div className="block logo">
          <span className="text-yellow-main"> SACRIFICE </span>
        </div>
        <div className="nav_action">
          <WalletConnect />
        </div>
      </div>
    </div>
  );
}
