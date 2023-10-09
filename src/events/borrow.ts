// @ts-ignore
import { Event, BigInt, Bytes, Address } from "@hyperoracle/zkgraph-lib";

export class Borrow {
  public borrower: Address;
  public borrowAmount: BigInt;
  public accountBorrows: BigInt;
  public totalBorrows: BigInt;

  constructor(borrower: Address, borrowAmount: BigInt, accountBorrows: BigInt, totalBorrows: BigInt) {
    this.borrower = borrower;
    this.borrowAmount = borrowAmount;
    this.accountBorrows = accountBorrows;
    this.totalBorrows = totalBorrows;
  }

  /**
   * Creates a Borrow object from an Event.
   *
   * @param {Event} event - The Event object to convert.
   * @return {Sync} The created Borrow object.
   */
  static fromEvent(
    event: Event,
  ): Borrow {
    const source = changetype<Bytes>(event.data);
    const borrower = Address.fromBytes(source.slice(12, 32));
    const borrowAmount = BigInt.fromBytes(source.slice(32, 64)); 
    const accountBorrows = BigInt.fromBytes(source.slice(64, 96));
    const totalBorrows = BigInt.fromBytes(source.slice(96, 128));

    return new Borrow(borrower, borrowAmount, accountBorrows, totalBorrows);
  }
}
