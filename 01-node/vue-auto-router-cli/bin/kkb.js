#! /usr/bin/env node
console.log("kkb-start...");

const program = require("commander");
program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));

program
  .command("refresh")
  .description("refresh routers...")
  .action(require("../lib/refresh"));

program
  .command("test")
  .description("add unit-test")
  .action(require("../lib/test"));
program.parse(process.argv);
