import { BigInt } from "@hyperoracle/zkgraph-lib";

export const CLOSE_FACTOR = BigInt.fromI64(500000000000000000);
export const COLLATERAL_FACTOR = BigInt.fromI64(900000000000000000);
export const ONE_FACTOR = BigInt.fromI64(1000000000000000000);

export const USDC_PAIR_ADDRESS = "0x0000000000000000000000000000000000000000";

export const NEW_CLOSE_FACTOR_ESIG =
  "0x3b9670cf975d26958e754b57098eaa2ac914d8d2a31b83257997b9f346110fd9";
export const NEW_COLLATERAL_FACTOR_ESIG =  
  "0x70483e6592cd5182d45ac970e05bc62cdcc90e9d8ef2c2dbe686cf383bcd7fc5";
export const MINT_ESIG = "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f";
export const REDEEM_ESIG = "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929";
export const BORROW_ESIG = "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80";
export const REPAY_BORROW_ESIG = "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1";
export const SYNC_ESIG = "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1";

export const MINT_ESIG_U32: u32 = BigInt.fromString(MINT_ESIG).toU32();
export const REDEEM_ESIG_U32: u32 = BigInt.fromString(REDEEM_ESIG).toU32();
export const BORROW_ESIG_U32: u32 = BigInt.fromString(BORROW_ESIG).toU32();
export const REPAY_BORROW_ESIG_U32: u32 = BigInt.fromString(REPAY_BORROW_ESIG).toU32();
export const SYNC_ESIG_U32: u32 = BigInt.fromString(SYNC_ESIG).toU32();
