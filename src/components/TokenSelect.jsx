import React, { useState, useEffect } from "react";
import { useEthersProvider } from "hooks/useEthers";
import { useAccount } from "wagmi";
import { getBalance } from "utils/balanceHalper";
import { toFixed } from "utils/customHelpers";

export default function TokenSelect({
  setOpen,
  token,
  setAmount,
  selectOnly,
  setStates,
  amount,
  setInsufficient,
  insufficient,
  updateBalance,
}) {
  const provider = useEthersProvider();
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [localAmount, setLocalAmount] = useState("");

  const handleMaxAmount = () => {
    setAmount(balance);
    setLocalAmount(Number(balance));
  };

  const checkAvailable = (value) => {
    if (Number(value) <= balance) {
      setStates(true);
      setInsufficient(false);
    } else {
      setStates(false);
      setInsufficient(true);
    }
  };

  const fetchBalance = async (token) => {
    const balance = await getBalance(address, token, provider);
    setBalance(balance);
    setStates(Number(balance) > 0);
    setLoading(false);
  };

  const handleChangeValue = (e) => {
    setAmount(Number(e.target.value));
  };

  useEffect(() => {
    if (!selectOnly && !loading) {
      checkAvailable(localAmount);
    }
  }, [loading, token]);

  useEffect(() => {
    setLoading(true);
    fetchBalance(token);
  }, [token, updateBalance]);

  useEffect(() => {
    if (!selectOnly) {
      if (localAmount && localAmount !== 0 && localAmount !== "0") {
        setInsufficient(Number(balance) <= Number(localAmount));
      } else {
        setInsufficient(false);
      }
    }
  }, [balance]);

  return (
    <>
      <div className="custom_input">
        <div className="token_select min-w-max mr-3">
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="flex items-center hover:bg-black transition ease-in-out rounded-full cursor-pointer p-2 bg-secondary min-w-max mr-2"
          >
            {token.isTokenOnly ? (
              <img className="w-8 h-8 rounded-full" src={token?.logoA} alt="" />
            ) : (
              <div className="w-8 h-8 relative ml-2">
                <img
                  className="w-8 h-8 rounded-full absolute left-1/2 -translate-x-[80%]"
                  src={token?.logoA}
                  alt=""
                />{" "}
                <img
                  className="w-8 h-8 rounded-full  absolute left-1/2 -translate-x-[30%]"
                  src={token?.logoB}
                  alt=""
                />
              </div>
            )}
            <span className="text-sm text-gray-200 md:w-28 hidden md:block text-center">
              {token?.lpSymbol}
            </span>
            <img className="rounded-full" src="/images/arrow-down.png" alt="" />
          </div>
          {!selectOnly && (
            <div
              onClick={handleMaxAmount}
              className="bg-secondary shadow-md shadow-gray hover:bg-black rounded-md px-2 py-1 text-[12px] transition ease-in-out"
            >
              max
            </div>
          )}
        </div>
        <div className="token_prices flex items-end flex-col relative w-full">
          <div className="flex absolute -top-3.5">
            {loading ? (
              <div className="bg-secondary mt-[2px]  rounded h-[12px] w-[60px] animate-pulse"></div>
            ) : (
              <p className="text-sm text-gray-400 text-end flex">
                {`Balance: ${balance ? toFixed(balance, 5) : "0.0"}`}
              </p>
            )}
          </div>
          {!selectOnly && (
            <input
              type="number"
              className="text-xl text-gray-200 text-end flex items-center"
              placeholder="0.0"
              min={0}
              value={amount}
              onChange={handleChangeValue}
            />
          )}

          {insufficient && (
            <p className="absolute -bottom-9  text-[12px] text-red-500">
              Insufficient Balance
            </p>
          )}
        </div>
      </div>
    </>
  );
}
