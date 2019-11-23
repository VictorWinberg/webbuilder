const fs = require('fs');
const util = require('util');
const format = require('string-template');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const build = async () => {
    try {
        const template = await readFile('helloworld.js', 'utf8');
        const contents = format(template, {
            class: 'HelloDude',
            method: 'run',
            test: 'hi'
        });
        await writeFile('helloworld-out.js', contents, 'utf8');
        const created = await readFile('helloworld-out.js', 'utf8');
        console.log(created);
    } catch (error) {

    }
}

build();