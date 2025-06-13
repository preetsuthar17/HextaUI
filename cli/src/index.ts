#!/usr/bin/env node

import { program } from "commander";
import { addComponents } from "./commands/add.js";
import { initCommand } from "./commands/init.js";
import { listComponents } from "./commands/list.js";

program
  .name("hextaui")
  .description("CLI tool for HextaUI component library")
  .version("1.0.0");

program
  .command("add")
  .description("Add components to your project")
  .action(addComponents);

program
  .command("init")
  .description("Initialize HextaUI in your project")
  .action(initCommand);

program
  .command("list")
  .alias("ls")
  .description("List all available components")
  .action(listComponents);

program.parse();
