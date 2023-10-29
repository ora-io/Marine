import { currentNpmScriptName, logDivider } from "./common/log_utils.js";
import { config } from "../config.js";
import * as zkgapi from "@hyperoracle/zkgraph-api";
import fs from "fs";

// Log script name
console.log(">> COMPILE", "\n");

// check if marine.ts and prices.ts is exist
if (!fs.existsSync("src/static/marine.ts") || !fs.existsSync("src/static/price.ts")) {
  console.log("[-] src/static/marine.ts or src/static/price.ts not found.\n You should run \`npm run marine -- 0xABC... and npm run prices first.\`", "\n");
  logDivider();
  process.exit(1);
}

if (currentNpmScriptName() === "compile-local") {
  // Compile Locally
  let isCompilationSuccess = await zkgapi.compile(
    config.LocalWasmBinPath,
    config.LocalWasmBinPath.replace(/\.wasm/, ".wat"),
    "",
    "",
    config.CompilerServerEndpoint,
    true,
    true,
  );
} else if (currentNpmScriptName() === "compile") {
  // Compile Remotely
  let isCompilationSuccess = await zkgapi.compile(
    config.WasmBinPath,
    config.WasmBinPath.replace(/\.wasm/, ".wat"),
    "src/mapping.ts",
    "src/zkgraph.yaml",
    config.CompilerServerEndpoint,
    false,
    true,
  );
}

logDivider();

process.exit(0);
