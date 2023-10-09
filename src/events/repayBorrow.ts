// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class RepayBorrow {
  public payer: Address;
  public borrower: Address;
  public repayAmount: BigInt;
  public accountBorrows: BigInt;
  public totalBorrows: BigInt;

  constructor(payer: Address, borrower: Address, repayAmount: BigInt, accountBorrows: BigInt, totalBorrows: BigInt) {
    this.payer = payer;
    this.borrower = borrower;
    this.repayAmount = repayAmount;
    this.accountBorrows = accountBorrows;
    this.totalBorrows = totalBorrows;
  }

  /**
   * Creates a RepayBorrow object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Sync} The created RepayBorrow object.
   */
  static fromEvent(
    event: Event,
  ): RepayBorrow {
    const source = changetype<Bytes>(event.data);
    const payer = Address.fromBytes(source.slice(12, 32));
    const borrower = Address.fromBytes(source.slice(44, 64));
    const repayAmount = BigInt.fromBytes(source.slice(64, 96));
    const accountBorrows = BigInt.fromBytes(source.slice(96, 128));
    const totalBorrows = BigInt.fromBytes(source.slice(128, 160));

    return new RepayBorrow(payer, borrower, repayAmount, accountBorrows, totalBorrows);
  }
}
