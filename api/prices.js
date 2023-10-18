/* eslint-disable require-jsdoc */
import {pairAddresses, token0IsUsdcs, decimals} from './common/modules/address.js';
import {pairAbi} from './common/modules/pairAbi.js';
import fs from 'fs/promises';
import {config} from '../config.js';
const endpoint = config.JsonRpcProviderUrl.mainnet;
import {Web3} from 'web3';
const web3 = new Web3(endpoint);

const PRICE_DECIMAL = 100;

function calcPrice(data, usdcIsToken0, token1Decimals) {
  const r0 = data[0];
  const r1 = data[1];

  if (usdcIsToken0) {
    const usdc = Number(r0) / 10 ** 6;
    const token = Number(r1) / 10 ** token1Decimals;
    return usdc / token;
  } else {
    const usdc = Number(r1) / 10 ** 6;
    const token = Number(r0) / 10 ** token1Decimals;
    return usdc / token;
  }
}

async function main() {
  const prices = [];
  for ( let i = 0; i < pairAddresses.length; i++) {
    const pA = pairAddresses[i];
    const isNoPair = pA.startsWith('0x00000000000000000000000000000000000000');
    if (isNoPair) {
      prices.push(0);
    } else {
      const Pair = new web3.eth.Contract(pairAbi, pA);
      const result = await Pair.methods.getReserves().call();
      const price = calcPrice(result, token0IsUsdcs[i], decimals[i]);
      prices.push(parseInt((price * PRICE_DECIMAL).toString()));
      console.log(pA, price);
    }
  }
  prices.splice(11,1);

  const result = 'export const prices: i64[] = ' + JSON.stringify(prices);
  await fs.writeFile('src/static/price.ts', result + '\n');
}

main();
