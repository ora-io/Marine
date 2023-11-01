//@ts-ignore
import { Bytes, Event } from "@hyperoracle/zkgraph-lib";
import {
  Configs
} from "../static/tokens";

import {
  updateConfigWithEvent,
  updateCloseFactor,
  updateCollateralFactor
} from "../modules/configUpdater";
import { calculateTotalValue, calculateTotalPrincipal, updatePrices } from "../modules/assetAggregator";
import { Result } from "../types/result";

export class Judgment{
  public shouldBeLiquidated: bool;
  public compoundUser: string;
  constructor(events: Event[]) {
    const configs = new Configs();
    // step1: If there is a NewCloseFactor or NewCollateralFactor event 
    // override the hardcoded Factor.
    updateCloseFactor(configs, events);
    updateCollateralFactor(configs, events);
    
    // step2: Update Balance and Principal by processing Mint Redeem Borrow Repay
    // Mint make balance +; Redeem make balance -
    // Borrow make principal +; Repay make Principal -
    updateConfigWithEvent(configs, events);

    // // step3: calculate totalValue and totalPrincipal
    // // totalValue += balance * price * COLLATERAL_FACTOR
    updatePrices(configs, events);
    const totalValue = calculateTotalValue(configs);
    const totalPrincipal = calculateTotalPrincipal(configs);
    // console.log("total value: " + totalValue.toString() + "U");
    // console.log("total principal: " + totalPrincipal.toString() + "U");

    // // step4: return totalValue <= totalPrincipal
    this.shouldBeLiquidated = totalValue < totalPrincipal;
    this.compoundUser = configs.userAddress;
  }

  toBytes(): Bytes {
    return new Result(this.shouldBeLiquidated, this.compoundUser).toBytes();
  }
}