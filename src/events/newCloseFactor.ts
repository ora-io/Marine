// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class NewCloseFactor {
  public oldCloseFactorMantissa: BigInt;
  public newCloseFactorMantissa: BigInt;

  constructor(oldCloseFactorMantissa: BigInt, newCloseFactorMantissa: BigInt) {
    this.oldCloseFactorMantissa = oldCloseFactorMantissa;
    this.newCloseFactorMantissa = newCloseFactorMantissa;
  }

    /**
   * Creates a NewCloseFactor object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {NewCloseFactor} The created NewCloseFactor object.
   */
  static fromEvent(event: Event): NewCloseFactor {
    const oldCloseFactorMantissa = BigInt.fromBytes(event.topic1);
    const newCloseFactorMantissa = BigInt.fromBytes(event.topic2);

    return new NewCloseFactor(oldCloseFactorMantissa, newCloseFactorMantissa);
  }
}