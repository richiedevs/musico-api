const { readdir, mkdir, readFile } = require('fs').promises;

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
        readFile('modules/' + files[i]).then(str => {
            if (!str.length) return;
            console.log(str)
        })
    }
});


