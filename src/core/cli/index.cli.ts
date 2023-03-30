#!/usr/bin/env node

import { program } from "commander";
import makeController from "./controller.cli";
// import makeService from "./service.cli";
import makeTest from "./test.cli";

program
    .command('make:controller <name>')
    .action((name) => {
        makeController(name)
    });

program
    .command('make:test <name>')
    .action((name) => {
        makeController(name)
    });

// program
//     .command('make:services <name>')
//     .action((name) => {
//         makeController(name)
//     });

program
    .command('make:resource <name>')
    .action((name) => {
        makeController(name)
        makeTest(name)
    });





program
    .command('version')
    .action(() => {
        console.log('1.0.0')
    });
program.parse(process.argv);