import { program } from "commander";
import { logDivider } from "./common/log_utils.js";

import { MarineFatcher } from './common/modules/fetcher.js';
import { MarineProcessor } from './common/modules/processor.js';

program.version("1.0.0");

program.argument(
  "<marine address>",
  "target marine address for generate compound testcase",
);
program.parse(process.argv);
const marine = program.args[0];
async function main () {
  console.log(">> MARINE", "\n");
  const fetcher = new MarineFatcher(marine)
  await fetcher.run()
  const processor = new MarineProcessor(marine)
  processor.run()

  logDivider();
  process.exit(0);
}

main()