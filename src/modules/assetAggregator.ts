import { BigInt, Bytes, Event } from "@hyperoracle/zkgraph-lib";
import { Configs } from "../static/tokens";
import { ONE_FACTOR, SYNC_ESIG, USDC_PAIR_ADDRESS } from "../static/constants";
import { Sync } from "../events/sync";

export function calculateTotalValue(configs: Configs, events: Event[], collateralFactor: BigInt): BigInt {
  let totalValue: BigInt = BigInt.zero();

  for (let i = 0; i <= events.length - 1; i++) {
    const event = events[i];
    if(event.esig.toHexString() != SYNC_ESIG) {
      continue;
    }
    const address = Bytes.fromByteArray(event.address).toHexString();
    // TODO: balanceCaresPairAddress should be a array...
    if (configs.balanceCaresPairAddress.toString() == address) {
      const decimals = configs.getDecimalsByAddress(address);
      const isToken0 = configs.getIsToken0ByAddress(address);
      const balance = configs.getBalanceByAddress(address);
      const sync = Sync.fromEvent(event, decimals, isToken0);
      const value = sync.price.times(collateralFactor.times(balance));
      totalValue = totalValue.add(value);
    }
  }

  if (configs.balanceCaresPairAddress.includes(USDC_PAIR_ADDRESS)) {
    const balance = configs.getBalanceByAddress(USDC_PAIR_ADDRESS);
    const value = balance.times(collateralFactor).div(ONE_FACTOR);
    totalValue = totalValue.add(value);
  }

  return totalValue;
}

export function calculateTotalPrincipal(configs: Configs, events: Event[]): BigInt {
    let totalPrincipal: BigInt = BigInt.zero();
    for (let i = 0; i <= events.length - 1; i++) {
      const event = events[i];
      if(event.esig.toHexString() != SYNC_ESIG) {
        continue
      }
      const address = Bytes.fromByteArray(event.address).toHexString();
      // TODO: principalCaresPairAddress should be a array...
      if (configs.principalCaresPairAddress.toString() == address) {
        const decimals = configs.getDecimalsByAddress(address);
        const isToken0 = configs.getIsToken0ByAddress(address);
        const principal = configs.getPrincipalByAddress(address);
        const sync = Sync.fromEvent(event, decimals, isToken0);
        const value = sync.price.times(principal);
        totalPrincipal = totalPrincipal.add(value);
      }
    }
  
    if (configs.principalCaresPairAddress.includes(USDC_PAIR_ADDRESS)) {
      const principal = configs.getPrincipalByAddress(USDC_PAIR_ADDRESS);
      totalPrincipal = totalPrincipal.add(principal);
    }
    return totalPrincipal;
  }
  