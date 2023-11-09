# 🐳 [Marine](https://mirror.xyz/hyperoracleblog.eth/iXLTbbggNTtLWqPB695IvJQo2DtgooEbvYVVuFVY6y8): Compound Protocol Liquidation Keeper

A zkGraph for determining whether any Compound account can be liquidated and then performing liquidation as keeper. 

Built using [HyperOracle](https://www.hyperoracle.io), a programmable zkOracle protocol.

# Getting Start

Test Marine locally by these steps.

### 1. Set up environment

```sh
npm install
vim config.js # Fill in the private key and endpoint in the configuration file.
```

### 2. Access the status of monitored Compound account

```sh
npm run marine -- 0x77C6d4c010EaeF7C0dC0080F78ded522AB58A926
```

### 3. Obtain the price of underlying assets

```sh
npm run prices
```

### 4. Compile && Run with specified block height

```sh
npm run compile-local && npm run exec-local -- 18370576
```

Then zkGraph returns a boolean value right after `0x53ad370d` in the result to indicate whether the user can be liquidated. In production, the return value will be the payload / calldata for triggering liquidation onchain.

# Technical Details

### Project Layout

- src - Core logic of Marine.
- builds - Compiled WASM Binary file and Compound user state file
- APIs - Libraries including zkgraph-api and other scripts for obtaining user accounts and underlying status.

### Core logic

1. Fetch events from Compound Protocol. Instantiate the events in receipts into corresponding EventClass.
2. If there is a Sync event, update the underlying asset prices specified in the configs. If there is `Mint`/`Redeem`/`Borrow`/`RepayBorrow`, update the defined Compound user state. The files for underlying prices and Compound user status are respectively `src/static/price.ts` and `src/static/marine.ts`. The core file that tracks the state, `src/static/tokens`, will reference them.
3. Calculate the user's `totalCollateralValue` and `totalPrincipalValue` by `assetAggregator`. The computation of `totalCollateralValue` needs to take into account the `cToken.collateralFactor` and its corresponding exchangeRate.
4. Compare `totalValue` and `totalPrincipal`, if `totalPrincipal` is larger, then the user can be liquidated.
