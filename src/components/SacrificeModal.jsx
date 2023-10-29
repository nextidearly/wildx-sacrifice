import React, { useState } from "react";
import Modal from "react-modal";
import { getLpContract } from "utils/contractHelpers";
import { useEthersSigner } from "hooks/useEthers";
import { fromReadableAmount } from "utils";
import { notify } from "utils/toastHelper";
import { didUserReject } from "utils/customHelpers";
import { ref, push } from "firebase/database";
import { db } from "config/firebase";
import Loading from "./Loading";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#16171E",
  },
};
export default function TokenSelectModal({
  open,
  closeModal,
  balance,
  address,
  pendingTX,
  setPendingTX,
}) {
  const lpAddress = "0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb";
  const treasuryAddress = "0xAE02196968A374A2d1281eD082F7A66b510FA8aD";
  const signer = useEthersSigner();
  const [amount, setAmount] = useState();

  const sacrifice = async () => {
    if (amount <= balance) {
      setPendingTX(true);
      try {
        const contract = getLpContract(lpAddress, signer);
        const tx = await contract.transfer(
          treasuryAddress,
          fromReadableAmount(amount)
        );
        await tx.wait();

        const dbRef = ref(db, "/wildbase");
        push(dbRef, {
          address: address,
          amount: amount,
        });
        notify("success", `${amount} Wildx Lp is deposited successfully!`);
        setPendingTX(false);
        closeModal();
      } catch (error) {
        setPendingTX(false);

        if (didUserReject(error)) {
          notify("error", "Rejected transaction!");
        } else {
          notify("error", error.reason);
        }
      }
    }
  };

  const handleMaxAmount = () => {
    setAmount(
      balance > 0 ? Number((Number(balance) - Number(0.0001)).toFixed(4)) : 0
    );
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => closeModal()}
      ariaHideApp={false}
      style={customStyle}
      contentLabel="Example Modal"
    >
      <div className="border-b border-yellow-500 py-4">
        <h1 className="text-xl text-yellow-main text-center">Sacrifice</h1>
      </div>

      <div className="p-4 flex items-center flex-col">
        <div className="w-full my-6">
          <div onClick={handleMaxAmount} className="text-right cursor-pointer">
            {balance}
          </div>
          <input
            type="number"
            className="w-full p-3 rounded  shadow shadow-black bg-black/20 border border-gray-300/20"
            placeholder="Input amount of Wildx Lp to sacrifice."
            max={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={sacrifice}
          disabled={!balance || !amount}
          className="bg-yellow-main flex py-2 mx-auto px-12 rounded-full text-black text-lg font-semibold animate-pulse hover:scale-110 duration-500 transition ease-in-out"
        >
          {!pendingTX ? (
            <>
              <Loading />
              Sacrifice...
            </>
          ) : (
            "Sacrifice"
          )}
        </button>
      </div>
    </Modal>
  );
}
