import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import TokenItem from "./TokenItem";

export default function TokenSelectModal({
  open,
  closeModal,
  setToken,
  disabledToken,
  selected,
  tokens,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenLists, setTokenLists] = useState();

  const handleToken = (value) => {
    setToken(value);
    closeModal();
  };

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      setTokenLists(tokens);
    }
  }, [open]);

  useEffect(() => {
    setTokenLists(tokens);
  }, []);

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

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => closeModal()}
        ariaHideApp={false}
        style={customStyle}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between border-b border-yellow-500 py-4">
          <h1 className="text-xl text-yellow-main">Select Token</h1>
          <button
            className="text-2xl text-yellow-main"
            onClick={() => closeModal()}
          >
            &times;
          </button>
        </div>
        <ul className="token_lists px-1">
          {tokenLists?.length ? (
            tokenLists.map((token, key) => {
              return (
                <TokenItem
                  key={key}
                  disabledToken={disabledToken}
                  token={token}
                  handleToken={handleToken}
                  selected={selected === token.lpAddresses}
                />
              );
            })
          ) : (
            <div className="text-center text-xl text-red-600 py-3">
              The token does exist!
            </div>
          )}
        </ul>
      </Modal>
    </div>
  );
}
