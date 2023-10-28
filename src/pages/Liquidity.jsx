import React, { useState, useEffect, useContext } from "react";
import TokenSelect from "components/TokenSelect";
import TokenSelectModal from "components/TokenSelectModal";

import { liquidityList } from "config/farms";

export default function Liquidity() {
  const [states, setStates] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [tokenA, setTokenA] = useState(liquidityList[2]);
  const [tokenB, setTokenB] = useState(liquidityList[0]);
  const [tokenAAmount, setTokenAAmount] = useState("");
  const [tokenBAmount, setTokenBAmount] = useState("");
  const [active, setActive] = useState(0);

  const [status, setStatus] = useState({
    insufficientA: false,
    insufficientB: false,
    tokenA: false,
    tokenB: false,
    loading: false,
    approve: false,
  });

  const closeModalA = () => {
    setOpenA(false);
  };

  const closeModalB = () => {
    setOpenB(false);
  };

  const handleSetInsufficientA = (flag) => {
    setStatus({ ...status, insufficientA: flag });
  };

  const handleSetInsufficientB = (flag) => {
    setStatus({ ...status, insufficientB: flag });
  };

  return (
    <div className="flex justify-center items-center flex-col  min-h-[calc(100vh-200px)] w-full">
      <div className="tab">
        <div className="flex justify-center">
          <div className="tab_panel">
            <div
              className={`tab_button ${active === 0 ? "active" : ""}`}
              onClick={() => setActive(0)}
            >
              Add Liquidity
            </div>
            <div
              className={`tab_button ${active === 1 ? "active" : ""}`}
              onClick={() => setActive(1)}
            >
              Remove Liquidity
            </div>
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            {/* <button className="action_btn"><img src="/images/chart.png" alt="" /></button> */}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="block">
              <h1 className="text-center text-yellow-main text-2xl">
                Add Liquidity
              </h1>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <button className="action_btn">
              <img src="/images/refresh.png" alt="" />
            </button>
            <button className="action_btn ml-3">
              <img src="/images/setting.png" alt="" />
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400">
          Receive LP tokens and earn trading fees
        </p>
        <div className="block w-full">
          <p className="text-sm text-gray-300">Select Token</p>
          <TokenSelect
            token={tokenA}
            setOpen={setOpenA}
            selectOnly={false}
            amount={tokenAAmount}
            setAmount={setTokenAAmount}
            setStates={setStates}
            setInsufficient={handleSetInsufficientA}
          />

          <div className="flex justify-center">
            <div className="swap_btn_box2">CHOOSE A VALID PAIR</div>
          </div>

          <TokenSelect
            token={tokenB}
            setOpen={setOpenB}
            amount={tokenBAmount}
            setAmount={setTokenBAmount}
            selectOnly={false}
            setStates={setStates}
            setInsufficient={handleSetInsufficientB}
          />
        </div>
        <button className="custom_btn  mt-8 hover:bg-hover  flex justify-center disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700">
          Add Liquidity
        </button>
      </div>
      {/* TokenA modal */}
      <TokenSelectModal
        open={openA}
        closeModal={closeModalA}
        setToken={setTokenA}
        disabledToken={tokenA?.lpSymbol}
        tokens={[liquidityList[2]]}
      />
      {/* TokenB modal */}
      <TokenSelectModal
        open={openB}
        closeModal={closeModalB}
        setToken={setTokenB}
        disabledToken={tokenB?.lpSymbol}
        tokens={[liquidityList[0]]}
      />
    </div>
  );
}
