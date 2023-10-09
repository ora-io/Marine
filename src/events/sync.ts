// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

var usdcDecimals = BigInt.from(10).pow(6);

export class Sync {
  public reserve0: BigInt;
  public reserve1: BigInt;
  public price: BigInt;

  constructor(reserve0: BigInt, reserve1: BigInt, price: BigInt) {
    this.reserve0 = reserve0;
    this.reserve1 = reserve1;
    this.price = price;
  }

  /**
   * Creates a NewCollateralFactor object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @param {usdcIsToken0} bool - USDC is token0
   * @param {token1Decimals} BigInt - token1's decimals
   * @return {Sync} The created NewCollateralFactor object.
   */
  static fromEvent(
    event: Event,
    token1Decimals: i32,
    usdcIsToken0: bool
  ): Sync {
    const t1Decimals = BigInt.from(10).pow(token1Decimals);
    const source = changetype<Bytes>(event.data);
    const reserve0 = BigInt.fromBytesBigEndian(source.slice(0, 32));
    const reserve1 = BigInt.fromBytesBigEndian(source.slice(32, 64));
    let price: BigInt;

    if (usdcIsToken0) {
      price = reserve0
        .times(t1Decimals)
        .div(reserve1.times(usdcDecimals));
    } else {
      price = reserve1
        .times(usdcDecimals)
        .div(reserve0.times(t1Decimals));
    }

    return new Sync(reserve0, reserve1, price);
  }
}
