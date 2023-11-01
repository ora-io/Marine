import { BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Result {
  public isLiquidatable: bool;
  public compoundUser: Address;
  constructor(isLiquidatable: bool, compoundUserString: string) {
    this.isLiquidatable = isLiquidatable;
    this.compoundUser = Address.fromString(compoundUserString);
  }

  public toBytes(): Bytes {
    // function operate(bool isLiquidatable, address compoundUser) public {}
    let result: Bytes = Bytes.fromHexString("0x7b575b33");
    const isLiquiadtableInt = this.isLiquidatable ? 1 : 0;
    const isLiquidatableBytes = Bytes.fromI32(isLiquiadtableInt);
    result = Bytes.fromByteArray(result.concat(isLiquidatableBytes));
    result = Bytes.fromByteArray(result.concat(this.compoundUser));
    return result;
  }
}
