import { ethers } from "ethers";
import { getMasterChefAddress } from "utils/addressHelpers";

import { didUserReject, fromReadableAmount } from "./customHelpers";
import { notify } from "./toastHelper";

export const approve = async (lpContract, masterChefContract, address) => {
  return await lpContract.approve(
    masterChefContract.address,
    ethers.constants.MaxUint256,
    { from: address }
  );
};

export const stake = async (
  masterChefContract,
  pid,
  amount,
  decimals = 18,
  isCompound
) => {
  try {
    const tx = await masterChefContract.deposit(
      pid,
      fromReadableAmount(amount, decimals),
      isCompound
    );
    await tx.wait();
    notify("success", "Transaction successful!");
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};

export const unstake = async (
  masterChefContract,
  pid,
  amount,
  address,
  decimals = 18
) => {
  try {
    const tx = await masterChefContract.withdraw(
      pid,
      fromReadableAmount(amount, decimals),
      { from: address }
    );
    await tx.wait();
    notify("success", "Transaction successful!");
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};

export const zap = async (
  zapContract,
  tokenA,
  isNative,
  amount,
  tokenB,
  isOutNative,
  address
) => {
  try {
    if (isNative) {
      const tx = await zapContract.zapETH(tokenB, {
        from: address,
        value: amount,
      });
      await tx.wait();
      notify("success", "Zap successful!");
    } else {
      const tx = await zapContract.zap(tokenA, amount, tokenB, isOutNative, {
        from: address,
      });
      await tx.wait();
      notify("success", "Zap successful!");
    }
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};

export const zapForFarm = async (
  zapContract,
  tokenA,
  isNative,
  amount,
  tokenB,
  pid,
  address
) => {
  try {
    const masterchefAddress = getMasterChefAddress();
    if (isNative) {
      const tx = await zapContract.zapIntoFarmWithETH(
        tokenB,
        masterchefAddress,
        pid,
        { from: address, value: amount }
      );
      await tx.wait();
      notify("success", "Transaction successful!");
    } else {
      const tx = await zapContract.zapIntoFarmWithToken(
        tokenA,
        amount,
        tokenB,
        masterchefAddress,
        pid,
        false,
        { from: address }
      );
      await tx.wait();
      return notify("success", "Transaction successful!");
    }
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};

export const harvest = async (masterChefContract, pid, isCompound, address) => {
  try {
    const tx = await masterChefContract.deposit(pid, "0", isCompound);
    await tx.wait();
    notify("success", "Harvest successful!");
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};

export const harvestMany = async (
  masterChefContract,
  pids,
  isCompound,
  address
) => {
  try {
    const tx = await masterChefContract.harvestMany(pids, isCompound, {
      from: address,
    });
    await tx.wait();
    notify("success", "Harvest All successful!");
  } catch (e) {
    if (didUserReject(e)) {
      notify("error", "User rejected transaction");
    }
    return null;
  }
};
