#! /usr/bin/env node

import { Command } from "commander";
import list from "./commands/lists";

const program = new Command();

// program.command('gather').name("Server info").description("Simple Server info").version("0.0.1");

program.parse();
