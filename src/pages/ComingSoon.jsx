import SacrificeModal from "components/SacrificeModal";
import { useEthersSigner } from "hooks/useEthers";
import React, { useState, useEffect } from "react";
import { getLpContract } from "utils/contractHelpers";
import { toReadableAmount } from "utils/customHelpers";
import { ref, orderByChild, query, equalTo, get } from "firebase/database";
import { db } from "config/firebase";
import { useAccount } from "wagmi";
import { PiWarningOctagon } from "react-icons/pi";

export default function ComingSoon() {
  const lpAddress = "0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb";
  const signer = useEthersSigner();
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState();
  const [pendingTX, setPendingTX] = useState(false);
  const [sum, setSum] = useState(0);

  const fetchBalance = async (address) => {
    const contract = getLpContract(lpAddress, signer);
    const res = await contract.balanceOf(address);
    const readable = toReadableAmount(res.toString(), 18);
    setBalance(Number(Number(readable).toFixed(4)));

    const dbQuery = query(
      ref(db, "wildbase"),
      orderByChild("address"),
      equalTo(address)
    );

    get(dbQuery).then((snapshot) => {
      const exist = snapshot.val();
      if (exist) {
        Object.keys(exist).map((key) => {
          setSum((i) => i + exist[key].amount);
        });
      }
    });
  };

  const closeModal = () => {
    if (!pendingTX) {
      setOpen(false);
      fetchBalance(address);
    }
  };

  useEffect(() => {
    if (address && signer) {
      fetchBalance(address);
    } else {
      setSum(0);
    }
  }, [address, signer]);

  return (
    <div className="h-full mt-[100px] w-ful max-w-[600px] flex flex-col items-center justify-center px-6">
      <h1
        className={`lg:text-4xl text-3xl text-center font-bold mb-8 animate-pulse  ${
          !address || !balance ? "text-yellow-main" : "text-white"
        }`}
      >
        {address ? (
          <>
            {balance ? (
              <> You have ( {balance || 0} ) amount of WILDx LP on Base.</>
            ) : (
              <div className="flex flex-col items-center">
                <PiWarningOctagon className="text-7xl" /> <p>You do not have any WILDx LP.</p>{" "}
              </div>
            )}{" "}
          </>
        ) : (
          <>Please Connect Wallet.</>
        )}
      </h1>
      <p className="text-white text-lg mb-8 text-center">
        Sacrifice your BASE WILDx/wETH LP for a jumpstart on BSC's WILDx launch.
        The more you sacrifice the more you receive. There will be a thirty day
        linear vest of your WILDx rewards on BSC.
      </p>

      <p className="mb-6">Your total sacrifice amount of wildx LP: ( {sum} )</p>
      <button
        disabled={!balance || !address}
        onClick={() => setOpen(true)}
        className="bg-yellow-main py-2 px-12 rounded-full text-black text-lg font-semibold animate-pulse hover:scale-110 duration-500 transition ease-in-out"
      >
        Sacrifice
      </button>

      <SacrificeModal
        open={open}
        balance={balance}
        address={address}
        closeModal={closeModal}
        pendingTX={pendingTX}
        setPendingTX={setPendingTX}
      />
    </div>
  );
}
