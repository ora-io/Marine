import { Address, BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import {
  BORROW_ESIG,
  REDEEM_ESIG,
  REPAY_BORROW_ESIG,
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
