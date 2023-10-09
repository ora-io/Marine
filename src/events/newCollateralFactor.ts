// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class NewCollateralFactor {
  public cToken: Address;
  public oldCollateralFactorMantissa: BigInt;
  public newCollateralFactorMantissa: BigInt;

  constructor(cToken: Address, oldCollateralFactorMantissa: BigInt, newCollateralFactorMantissa: BigInt) {
    this.cToken = cToken;
    this.oldCollateralFactorMantissa = oldCollateralFactorMantissa;
    this.newCollateralFactorMantissa = newCollateralFactorMantissa;
  }

    /**
   * Creates a NewCollateralFactor object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {NewCollateralFactor} The created NewCollateralFactor object.
   */
  static fromEvent(event: Event): NewCollateralFactor {
    const cToken = Address.fromBytes(event.topic1);
    const oldCollateralFactorMantissa = BigInt.fromBytes(event.topic2);
    const newCollateralFactorMantissa = BigInt.fromBytes(event.topic3);

    return new NewCollateralFactor(cToken, oldCollateralFactorMantissa, newCollateralFactorMantissa);
  }
}