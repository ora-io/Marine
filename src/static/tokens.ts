import { BigInt } from "@hyperoracle/zkgraph-lib";

export class Configs {
  public userAddress: string = "";
  public marketAddresses: string[] = [
    "0x70e36f6BF80a52b3B46b3aF8e106CC0ed743E8e4",
    "0x12392F67bdf24faE0AF363c24aC620a2f67DAd86",
    "0xe65cdB6479BaC1e22340E4E755fAE7E509EcD06c",
    "0x7713DD9Ca933848F6819F38B8352D9A15EA73F67",
    "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
    "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
    "0xccF4429DB6322D5C611ee964527D42E5d685DD6a",
    "0x4B0181102A0112A2ef11AbEE5563bb4a3176c9d7",
    "0x041171993284df560249B57358F931D9eB7b925D",
    "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9",
    "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
    "0xccF4429DB6322D5C611ee964527D42E5d685DD6a",
    "0xFAce851a4921ce59e912d19329929CE6da6EB0c7",
    "0x80a2AE356fc9ef4305676f7a3E2Ed04e12C33946",
    "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
    "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
    "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
    "0x35A18000230DA775CAc24873d00Ff85BccdeD550",
    "0x95b4eF2869eBD94BEb4eEE400a99824BF5DC325b",
  ];
  public decimals: i32[] = [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18];
  public underlyings: string[] = [
    "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    "0x0000000000085d4780B73119b644AE5ecd22b376",
    "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
    "0x1985365e9f78359a9B6AD760e32412f4a445E862",
    "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x0000000000000000000000000000000000000000",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  ];
  public pairAddresses: string[] = [
    "0x6F81d90E771B551451382b4c8B41C86B978d3420",
    "0xf1f27Db872b7F6E8B873C97F785fe4f9a6C92161",
    "0x674E114dAd81838d151d9BedA2271228eeAe0E8B",
    "0x40C6Bc1dB179a5c3D464Cac557AB890825C638F3",
    "0x0000000000000000000000000000000000000001",
    "0x9f65DF828d21C8860ee1499dA6397D50d85E14a0",
    "0x004375Dff511095CC5A197A54140a24eFEF3A416",
    "0x239650663A422273C0b2c7A1f1a8bdAb69E78D1B",
    "0x3139Ffc91B99aa94DA8A2dc13f1fC36F9BDc98eE",
    "0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f",
    "0x0000000000000000000000000000000000000002",
    "0x004375Dff511095CC5A197A54140a24eFEF3A416",
    "0xd8C8a2B125527bf97c8e4845b25dE7e964468F77",
    "0xdE37cD310c70e7Fa9d7eD3261515B107D5Fe1F2d",
    "0x02DD9Ff64EeC5D866a512EF08463C7c85A14e4Aa",
    "0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5",
    "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
    "0x0000000000000000000000000000000000000000",
    "0x004375Dff511095CC5A197A54140a24eFEF3A416",
    "0xEBFb684dD2b01E698ca6c14F10e4f289934a54D6",
    "0x340A5a2F73eBaa181eC2826802Fdf8ED21Fc759a",
  ];
  public token0IsUsdcs: bool[] = [
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
  ];
  public balances: i64[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000000000000000000, 0,
    0, 0,
  ];
  public principals: i64[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 567107750472589, 0, 0,
    0, 0,
  ];
  // alice stake 1 USDC and borrow 0.000628 ETH
  public balanceCaresPairAddress: string[] = [];
  public principalCaresPairAddress: string[] = [];

  constructor() {
    for (let i = 0; i < this.balances.length; i++) {
      let address = this.pairAddresses[i];
      if (this.balances[i] != 0) {
        this.balanceCaresPairAddress.push(address);
      }
      if (this.principals[i] != 0) {
        this.principalCaresPairAddress.push(address);
      }
    }
  }

  public getDecimalsByAddress(address: string): i32 {
    if (!this.pairAddresses.includes(address)) return 0;
    let index = this.pairAddresses.indexOf(address);
    return this.decimals[index];
  }

  public getIsToken0ByAddress(address: string): bool {
    if (!this.pairAddresses.includes(address)) return false;
    let index = this.pairAddresses.indexOf(address);
    return this.token0IsUsdcs[index];
  }

  public getBalanceByAddress(address: string): BigInt {
    if (!this.pairAddresses.includes(address)) return BigInt.zero();
    let index = this.pairAddresses.indexOf(address);
    return BigInt.fromI64(this.balances[index]);
  }

  public getPrincipalByAddress(address: string): BigInt {
    if (!this.pairAddresses.includes(address)) return BigInt.zero();
    let index = this.pairAddresses.indexOf(address);
    return BigInt.fromI64(this.principals[index]);
  }

  public getBalanceByMarket(marketAddresses: string): BigInt {
    if (!this.marketAddresses.includes(marketAddresses)) return BigInt.zero();
    let index = this.marketAddresses.indexOf(marketAddresses);
    return BigInt.fromI64(this.balances[index]);
  }
  public setBalanceByMarket(marketAddresses: string, balance: BigInt): void {
    if (!this.marketAddresses.includes(marketAddresses)) return;
    let index = this.marketAddresses.indexOf(marketAddresses);
    this.balances[index] = balance.toI64();
  }
  public getPrincipalByMarket(marketAddresses: string): BigInt {
    if (!this.marketAddresses.includes(marketAddresses)) return BigInt.zero();
    let index = this.marketAddresses.indexOf(marketAddresses);
    return BigInt.fromI64(this.principals[index]);
  }
  public setPrincipalByMarket(marketAddresses: string, principal: BigInt): void {
    if (!this.marketAddresses.includes(marketAddresses)) return;
    let index = this.marketAddresses.indexOf(marketAddresses);
    this.principals[index] = principal.toI64();
  }
}
