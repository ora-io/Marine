// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Mint {
  public minter: Address;
  public mintAmount: BigInt;
  public mintTokens: BigInt;

  constructor(minter: Address, mintAmount: BigInt, mintTokens: BigInt) {
    this.minter = minter;
    this.mintAmount = mintAmount;
    this.mintTokens = mintTokens;
  }

  /**
   * Creates a Mint object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Sync} The created Mint object.
   */
  static fromEvent(
    event: Event,
  ): Mint {
    const source = changetype<Bytes>(event.data);
    const minter = Address.fromBytes(source.slice(12, 32));
    const mintAmount = BigInt.fromBytes(source.slice(32, 64)); 
    const mintTokens = BigInt.fromBytes(source.slice(64, 96));

    return new Mint(minter, mintAmount, mintTokens);
  }
}
