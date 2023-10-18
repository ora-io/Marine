import { program } from "commander";

import { MarineFatcher } from './common/modules/fetcher.js';
import { MarineProcessor } from './common/modules/processor.js';

program.version("1.0.0");

program.argument(
  "<marine address>",
  "target marine address for generate compound testcase",
);
program.parse(process.argv);
const marine = program.args[0];
export async function updateMarine (marineAddress) {
  console.log(">> MARINE", "\n");
  const fetcher = new MarineFatcher(marineAddress)
  await fetcher.run()
  const processor = new MarineProcessor(marineAddress)
  processor.run()
}

updateMarine(marine)
