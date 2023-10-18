import { BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Configs } from "../static/tokens";
import { PRICE_DECIMAL, SYNC_ESIG, ONE_FACTOR, BALANCE_PRINCIPAL_DECIMAL, CTOKEN_DECIMAL } from "../static/constants";
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
    const balance = BigInt.from(configs.balances[i]).times(BALANCE_PRINCIPAL_DECIMAL);
    const price = BigInt.from(configs.prices[i]).times(2).div(100);
    const collateralFactor = configs.collateralFactors[i];
    const decimal = CTOKEN_DECIMAL;

    const valueAfterDecimal = balance.div(10**decimal).toI64();
    const amount = BigInt.from(valueAfterDecimal).times(price).div(PRICE_DECIMAL);
    const amountAfterFactor = amount.times(collateralFactor).div(ONE_FACTOR);
    totalValue = totalValue.add(amountAfterFactor);
  }
  return totalValue;
}

export function calculateTotalPrincipal(configs: Configs): BigInt {
    let totalPrincipal: BigInt = BigInt.zero();
    for (let i = 0; i < configs.principals.length - 1; i++) {
      const price = BigInt.from(configs.prices[i]);
      const principal = BigInt.from(configs.principals[i]).times(BALANCE_PRINCIPAL_DECIMAL);
      const decimal = configs.decimals[i];
      if(decimal > 10){
        const principalAfterDecimal = principal.div(10**(decimal - 10)).toI64();
        const amounte10 = BigInt.from(principalAfterDecimal).times(price).div(PRICE_DECIMAL).toI64();
        const amounte5 = BigInt.from(amounte10).div(10**5).toI64();
        const amount = BigInt.from(amounte5).div(10**5).toI64();
        totalPrincipal = totalPrincipal.add(amount);
      } else {
        const principalAfterDecimal = principal.div(10**decimal).toI64();
        const amount = BigInt.from(principalAfterDecimal).times(price).div(PRICE_DECIMAL);
        totalPrincipal = totalPrincipal.add(amount);
      }
    }
    return totalPrincipal;
  }
  