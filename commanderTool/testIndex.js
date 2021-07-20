#!/usr/bin/env node 

const commander = require('commander')
commander
    .command('rm <dest> [otherDirs...]') // <dest>:目标参数；[otherDirs...]:可选参数
    .alias('r') // rm的别名
    .option('-r, --recursive', 'Remove recursively') // 默认cmd.recursive为
    .option('-d --drink <val1> [val2]', 'Drink', 'Beer') 
    // --drink中的drink为cmd.drink的key；
    // <val1>为必选参数，会赋值给drink，-d后面必须写参数，否则会报错；
    // [val2]为可选参数，会赋值给drink，可不传；
    // 'Drink'为描述；
    // 'Beer'为drink的初始值，会被<>或者[]覆盖；
    .action(function (d, otherD, cmd) {
        console.log('remove ' + d , cmd, cmd.drink, cmd.recursive)
        if (otherD) {
            otherD.forEach(function (oDir) {
                console.log('rmdir %s', oDir);
            });
        }

    })
commander.parse(process.argv)