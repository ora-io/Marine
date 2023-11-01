import { Address, BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import {
  MINT_ESIG_U32,
  REDEEM_ESIG_U32,
  BORROW_ESIG_U32,
  REPAY_BORROW_ESIG_U32,
} from "../static/constants";
import { Configs } from "../static/tokens";
import { Mint } from "../events/mint";
import { Redeem } from "../events/redeem";
import { Borrow } from "../events/borrow";
import { RepayBorrow } from "../events/repayBorrow";
import { NewCloseFactor } from "../events/newCloseFactor";
import { NewCollateralFactor } from "../events/newCollateralFactor";
import { COLLATERAL_FACTOR, NEW_CLOSE_FACTOR_ESIG, NEW_COLLATERAL_FACTOR_ESIG } from "../static/constants";

export function updateConfigWithEvent(configs: Configs, events: Event[]): void {
  for (let i = 0; i <= events.length - 1; i++) {
    const event = events[i];
    switch (event.esig.toU32()) {
      case MINT_ESIG_U32:
        const mint = Mint.fromEvent(event);
        if (mint.minter == Address.fromHexString(configs.userAddress)) {
            const cTokenAddress = event.address.toHexString();
            const oldBalance = configs.getBalanceByMarket(cTokenAddress);
            const newBalance = oldBalance.plus(mint.mintTokens);
            configs.setBalanceByMarket(cTokenAddress, newBalance);
        }
        break;
      case REDEEM_ESIG_U32:
        const redeem = Redeem.fromEvent(event);
        if (redeem.redeemer == Address.fromHexString(configs.userAddress)) {
          const cTokenAddress = event.address.toHexString();
          const oldBalance = configs.getBalanceByMarket(cTokenAddress);
          const newBalance = oldBalance.minus(redeem.redeemTokens);
          configs.setBalanceByMarket(cTokenAddress, newBalance);
        }
        break;
      case BORROW_ESIG_U32:
        const borrow = Borrow.fromEvent(event);
        if (borrow.borrower == Address.fromHexString(configs.userAddress)) {
          const cTokenAddress = event.address.toHexString();
          const newPrincipal = borrow.accountBorrows;
          configs.setBalanceByMarket(cTokenAddress, newPrincipal);
        }
        break;
      case REPAY_BORROW_ESIG_U32:
        const repayBorrow = RepayBorrow.fromEvent(event);
        if (repayBorrow.borrower == Address.fromHexString(configs.userAddress)) {
          const cTokenAddress = event.address.toHexString();
          const newPrincipal = repayBorrow.accountBorrows;
          configs.setBalanceByMarket(cTokenAddress, newPrincipal);
        }
        break;
    }
  }
}

export function updateCloseFactor(configs: Configs, events: Event[]): void {
  let closeFactor: BigInt;
  for (let i = 0; i <= events.length - 1; i++) {
    if (events[i].esig == Bytes.fromHexString(NEW_CLOSE_FACTOR_ESIG)) {
      const newCloseFactor = NewCloseFactor.fromEvent(events[i]);
      closeFactor = newCloseFactor.newCloseFactorMantissa;
      configs.closeFactor = closeFactor.toI64();
    }
  }
}

export function updateCollateralFactor(configs: Configs, events: Event[]): void {
  let collateralFactor = COLLATERAL_FACTOR;
  for (let i = 0; i <= events.length - 1; i++) {
    if (events[i].esig == Bytes.fromHexString(NEW_COLLATERAL_FACTOR_ESIG)) {
      const newCollateralFactor = NewCollateralFactor.fromEvent(events[i]);
      collateralFactor = newCollateralFactor.newCollateralFactorMantissa;
      const pairAddress = events[i].address;
      // console.log("pairAddress " + pairAddress.toHexString());
      configs.setCollateralFactorByPair(pairAddress.toHexString(), collateralFactor.toI64());
    }
  }
}
