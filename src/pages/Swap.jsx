import React, { useState } from "react";
import TokenSelectModal from "components/TokenSelectModal";
import TokenSelect from "components/TokenSelect";
import { getAllowance } from "utils";
import { useAccount, useNetwork } from "wagmi";
import { useEthersProvider, useEthersSigner } from "hooks/useEthers";
import { zapList } from "config/farms";
import Loading from "components/Loading";
import useZap from "hooks/useZap";
import { getZapAddress } from "utils/addressHelpers";
import { getErc20Contract, getLpContract } from "utils/contractHelpers";
import { didUserReject } from "utils/customHelpers";
import { ethers } from "ethers";
import { notify } from "utils/toastHelper";

export default function Swap() {
  const signer = useEthersSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const provider = useEthersProvider();
  const [status, setStatus] = useState({
    insufficientA: false,
    insufficientB: false,
    tokenA: false,
    tokenB: false,
    loading: false,
    swap: false,
    approve: false,
  });

  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [tokenA, setTokenA] = useState(zapList[1]);
  const [tokenB, setTokenB] = useState(zapList[3]);
  const [tokenAAllowance, setTokenAAllowance] = useState(0);
  const [tokenAAmount, setTokenAAmount] = useState("");
  const [tokenBAmount, setTokenBAmount] = useState("");
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);
  const { onZap } = useZap();
  const zapAddress = getZapAddress();
  const [isApproving, setIsApproving] = useState(false);
  const [updateBalance, setUpdateBalance] = useState(false);

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

  const handleSetTokenAAvailable = (flag) => {
    setStatus({ ...status, tokenA: flag });
  };

  const handleSetTokenBAvailable = (flag) => {
    setStatus({ ...status, tokenB: flag });
  };

  const handleReverse = () => {
    const tempTokenA = tokenA;
    setTokenA(tokenB);
    setTokenB(tempTokenA);
    setTokenAAmount(tokenBAmount);
    checkAllowance(tokenB, "A");
  };

  const handleSetTokenA = (val) => {
    setTokenA(val);
    checkAllowance(tokenA, "A");
  };

  const handleSetTokenB = (val) => {
    setTokenB(val);
    checkAllowance(tokenB, "B");
  };

  const checkAllowance = async (token, type) => {
    if (token.lpSymbol !== "ETH") {
      setIsCheckingAllowance(true);
      const res = await getAllowance(address, token, zapAddress, provider);
      console.log(res);
      if (type === "A") {
        setTokenAAllowance(res);
      }
      setIsCheckingAllowance(false);
    }
  };

  async function handleApprove() {
    try {
      if (Number(tokenAAllowance) < Number(tokenAAmount)) {
        console.log("approving...");
        setIsApproving(true);
        let tokenContract;
        if (tokenA.isTokenOnly) {
          tokenContract = getErc20Contract(tokenA.lpAddresses, signer);
        } else {
          tokenContract = getLpContract(tokenA.lpAddresses, signer);
        }
        const tx = await tokenContract.approve(
          zapAddress,
          ethers.constants.MaxUint256,
          { from: address }
        );
        await tx.wait();
        setIsApproving(false);
        checkAllowance(tokenA, "A");
      }
    } catch (e) {
      console.log(e);
      if (didUserReject(e)) {
        notify("error", "User rejected transaction");
      }
      setIsApproving(false);
    }
  }

  async function handleDeposit() {
    if (tokenA === tokenB) return;
    try {
      setPendingTx(true);
      await onZap(
        tokenA.lpAddresses,
        tokenA.lpSymbol === "ETH" ? true : false,
        ethers.utils.parseEther(tokenAAmount?.toString() || "1"),
        tokenB.lpAddresses,
        tokenB.lpSymbol === "ETH" ? true : false
      );
      refreshData();
      setPendingTx(false);
    } catch (e) {
      console.log(e);
      if (didUserReject(e)) {
        notify("error", "User rejected transaction");
      }
      setPendingTx(false);
    }
  }

  const refreshData = () => {
    setTokenAAmount("");
    setUpdateBalance(true);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="card">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center items-center">
            <div className="block">
              <h1 className="text-center text-yellow-main text-2xl font-semibold">
                Zapper
              </h1>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <button
              className="action_btn shadow-md shadow-black hover:bg-black  transition ease-in-out"
              onClick={refreshData}
            >
              <img src="/images/refresh.png" alt="" />
            </button>
          </div>
        </div>
        <p className="text-center text-gray-400 py-3">
          Trade tokens in on instant
        </p>
        <div className="block">
          <TokenSelect
            type="A"
            token={tokenA}
            selectOnly={false}
            amount={tokenAAmount}
            setOpen={setOpenA}
            setAmount={setTokenAAmount}
            setStates={handleSetTokenAAvailable}
            setInsufficient={handleSetInsufficientA}
            updateBalance={updateBalance}
          />

          <div className="flex justify-center">
            <div className="swap_btn_box">
              <button
                onClick={handleReverse}
                className="scale-100 hover:scale-110 transition ease-in-out"
              >
                <img
                  className="w-7 transition ease-in-out"
                  src="/images/swap.png"
                  alt=""
                />
              </button>
            </div>
          </div>
          <TokenSelect
            type="B"
            selectOnly={true}
            token={tokenB}
            amount={tokenBAmount}
            setOpen={setOpenB}
            setAmount={setTokenBAmount}
            setStates={handleSetTokenBAvailable}
            setInsufficient={handleSetInsufficientB}
            updateBalance={updateBalance}
          />

          {isCheckingAllowance ? (
            <button className="custom_btn  mt-8 hover:bg-hover  flex justify-center disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700">
              <Loading /> Loading...
            </button>
          ) : tokenA.lpSymbol !== "ETH" && Number(tokenAAllowance) === 0 ? (
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="custom_btn  mt-8 hover:bg-hover disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700"
            >
              {isApproving ? (
                <div className="flex justify-center gap-1">
                  <Loading /> Approving...
                </div>
              ) : (
                "Approve"
              )}{" "}
            </button>
          ) : (
            <button
              onClick={handleDeposit}
              disabled={
                Number(tokenAAmount) <= 0 ||
                status.insufficientA ||
                pendingTx ||
                isApproving
              }
              className="custom_btn  mt-8 hover:bg-hover disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700"
            >
              {pendingTx ? (
                <div className="flex justify-center gap-1">
                  <Loading /> Zapping...
                </div>
              ) : (
                `Swap ${tokenA.lpSymbol} into ${tokenB.lpSymbol}`
              )}{" "}
            </button>
          )}
        </div>
        {/* TokenA modal */}
        <TokenSelectModal
          open={openA}
          closeModal={closeModalA}
          setToken={handleSetTokenA}
          disabledToken={tokenB?.lpSymbol}
          tokens={zapList}
        />
        {/* TokenB modal */}
        <TokenSelectModal
          open={openB}
          closeModal={closeModalB}
          setToken={handleSetTokenB}
          disabledToken={tokenA?.lpSymbol}
          tokens={zapList}
        />
      </div>
    </div>
  );
}
