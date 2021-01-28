const { readdir, mkdir, readFile } = require('fs').promises;

let modules = {};

let init = () => {
    return new Promise((resolve, reject) => {
        readdir('modules').then(resolve).catch(e => {
            // If no directory then make one
            if (e.code !== 'ENOENT') reject(e);

            mkdir('modules').then(() => {
                init().then(resolve)
            })
        })
    })
}

init().then(files => {
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
        let o = require('./modules/' + files[i])
        modules[files[i].replace('.js', '')] = o;
        modules[Object.keys(modules)[i]].run(global)
    }
});

