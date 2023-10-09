// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Redeem {
  public redeemer: Address;
  public redeemAmount: BigInt;
  public redeemTokens: BigInt;

  constructor(redeemer: Address, redeemAmount: BigInt, redeemTokens: BigInt) {
    this.redeemer = redeemer;
    this.redeemAmount = redeemAmount;
    this.redeemTokens = redeemTokens;
  }

  /**
   * Creates a Redeem object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Sync} The created Redeem object.
   */
  static fromEvent(
    event: Event,
  ): Redeem {
    const source = changetype<Bytes>(event.data);
    const redeemer = Address.fromBytes(source.slice(12, 32));
    const redeemAmount = BigInt.fromBytes(source.slice(32, 64)); 
    const redeemTokens = BigInt.fromBytes(source.slice(64, 96));

    return new Redeem(redeemer, redeemAmount, redeemTokens);
  }
}
