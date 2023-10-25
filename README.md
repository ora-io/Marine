# zkCompound

This is a zkgraph used to determine whether any compound user can be liquidated. It is built using [HyperOracle](https://www.hyperoracle.io), a programmable zkOracle protocol.

# Getting Start
Through the following steps, locally test zkCompound.

### 1. Prepare environment
```sh
npm install
vim config.js # Fill in the private key and endpoint in the configuration file.
```

### 2. Obtain the status of the compound account to be monitored.

```sh
npm run marine -- 0x77C6d4c010EaeF7C0dC0080F78ded522AB58A926
```

### 3. Obtain the price of underlyings.

```sh
npm run prices
```

### 4. Compile && Run at the specified block height.

```sh
npm run compile-local && npm run exec-local -- 18370576
```

At this point, zkgraph returns a boolean value indicating whether the user can be liquidated.

You can modify the address `0x77C6d4c010EaeF7C0dC0080F78ded522AB58A926` and block height `18370576` in the above command to any value for further testing.

# Project Layout

### zkCompound project is broken down into three sections:
- src - The core logic of zkCompound.
- builds - Compiled WASM Binary file and compound user state file
- APIs - Some zkgraph-api and scripts for obtaining hard-coded users and underlying status.

### core logic of zkCompound

1. Fetch events on the Compound Market chain. Instantiate the events in receipts into corresponding EventClass.
2. If there is a Sync event, update the underlying prices hardcoded in the configs. If there is `Mint`/`Redeem`/`Borrow`/`RepayBorrow`, update the hardcoded compound user state. The hard-coded files for underlying prices and compound user status are respectively `src/static/price.ts` and `src/static/marine.ts`. The core file that records the state, `src/static/tokens`, will reference them.
3. Calculate the user's totalCollateralValue and totalPrincipalValue by assetAggregator. The calculation of totalCollateralValue needs to take into account the cToken.collateralFactor and its corresponding exchangeRate.
4. Compare `totalValue` and `totalPrincipal`, if `totalPrincipal` is larger, then the user can be liquidated.

# Development roadmap

1. The current underlying and compound user states are implemented with hard coding. This part of the logic will be rewritten using zkgraph state proof soon.

2. Refactor configUpdater and factorUpdater, the two can be merged. The `comptroller.closeFactor` remains constant in the long term and can be implemented by hard coding it as a constant.

3. Refactor static/tokens: The table lookup operation is changed to be implemented through a dictionary, making the code structure more elegant.

4. The current hard-coded exchange rate needs to be more accurate. 

5. There are precision issues in the calculations of balances and principals, and the usage of BigInt needs to be improved.

6. modify `configs` into `positions`

7. src/static Decoupling

8. developer scripts merge into main branch