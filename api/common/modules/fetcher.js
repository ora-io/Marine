import { cTokenAbi } from './cToken.js'
import { marketAddress } from './address.js'
import fs from 'fs/promises'
import fss from 'fs'
import { config } from '../../../config.js'
import { Web3 } from 'web3'
const endpoint = config.JsonRpcProviderUrl.mainnet;
const web3 = new Web3(endpoint)
const resultOutputPath = 'build/'

export class MarineFatcher {
  constructor (marine) {
    this.marine = marine
  }

  run = async () => {
    const filePath = resultOutputPath + this.marine + '.json'
    if (fss.existsSync(filePath)) {
      console.log('marine ' + this.marine + ' already exists')
      return
    }
    const result = {}
    for (let i = 0; i < marketAddress.length; i++) {
      const Market = new web3.eth.Contract(cTokenAbi, marketAddress[i])
      let snapshot;
      try {
        snapshot = await Market.methods.getAccountSnapshot(this.marine).call()
      } catch {
        snapshot = [0, 0, 0]
      }
      
      result[marketAddress[i]] = {
        balance: snapshot[1].toString(),
        principal: snapshot[2].toString()
      }
      console.log('Fetching state of market ' + marketAddress[i])
    }
    const resultString = JSON.stringify(result)
    await fs.writeFile(filePath, resultString)
  }
}
