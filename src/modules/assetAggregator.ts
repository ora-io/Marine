import { BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Configs } from "../static/tokens";
import { PRICE_DECIMAL, SYNC_ESIG, ONE_FACTOR } from "../static/constants";
import { Sync } from "../events/sync";

export function updatePrices(configs: Configs, events: Event[]):void {
  for (let i = 0; i <= events.length - 1; i++) {
    const event = events[i];
    if(event.esig.toHexString() != SYNC_ESIG) {
      continue;
    }
    const address = Bytes.fromByteArray(event.address).toHexString();
    const decimals = configs.getDecimalsByAddress(address);
    const isToken0 = configs.getIsToken0ByAddress(address);
    const sync = Sync.fromEvent(event, decimals, isToken0);
    const price = sync.price.times(PRICE_DECIMAL);
    const newPrice = price.toI64();
    configs.setPricesByPair(address, newPrice);
  }
}

export function calculateTotalValue(configs: Configs): BigInt {
  let totalValue: BigInt = BigInt.zero();
  for (let i = 0; i < configs.balances.length - 1; i++) {
    const balance = configs.balances[i];
    const price = BigInt.from(configs.prices[i]);
    const value = BigInt.from(balance).times(price);
    const collateralFactor = configs.collateralFactors[i];
    const valueAfterFactor = value.times(collateralFactor).div(ONE_FACTOR).div(PRICE_DECIMAL);
    totalValue = totalValue.add(valueAfterFactor);
  }
  return totalValue;
}

export function calculateTotalPrincipal(configs: Configs): BigInt {
    let totalPrincipal: BigInt = BigInt.zero();
    for (let i = 0; i < configs.principals.length - 1; i++) {
      const principal = configs.principals[i];
      const price = BigInt.from(configs.prices[i]);
      const amount = BigInt.from(principal).times(price).div(PRICE_DECIMAL);
      totalPrincipal = totalPrincipal.add(amount);
    }
    return totalPrincipal;
  }
  