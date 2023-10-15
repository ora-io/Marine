import { BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Configs } from "../static/tokens";
import { NewCloseFactor } from "../events/newCloseFactor";
import { NewCollateralFactor } from "../events/newCollateralFactor";
import { CLOSE_FACTOR, COLLATERAL_FACTOR, NEW_CLOSE_FACTOR_ESIG, NEW_COLLATERAL_FACTOR_ESIG } from "../static/constants";

export function updateCloseFactor(events: Event[]): BigInt {
  let closeFactor = CLOSE_FACTOR;
  for (let i = 0; i <= events.length - 1; i++) {
    if (events[i].esig == Bytes.fromHexString(NEW_CLOSE_FACTOR_ESIG)) {
      const newCloseFactor = NewCloseFactor.fromEvent(events[i]);
      closeFactor = newCloseFactor.newCloseFactorMantissa;
    }
  }
  return closeFactor;
}

export function updateCollateralFactor(configs: Configs, events: Event[]): void {
  let collateralFactor = COLLATERAL_FACTOR;
  for (let i = 0; i <= events.length - 1; i++) {
    if (events[i].esig == Bytes.fromHexString(NEW_COLLATERAL_FACTOR_ESIG)) {
      const newCollateralFactor = NewCollateralFactor.fromEvent(events[i]);
      collateralFactor = newCollateralFactor.newCollateralFactorMantissa;
      const pairAddress = events[i].address;
      console.log("pairAddress " + pairAddress.toHexString());
      configs.setCollateralFactorByPair(pairAddress.toHexString(), collateralFactor.toI64());
    }
  }
}
