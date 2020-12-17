const { readdir, mkdir, readFile } = require('fs').promises;

let init = () => {
    return new Promise((resolve, reject) => {
        readdir('modules').then(c => {
            resolve(c);
        }).catch(e => {
            // If no directory then make one
            if (e.code === 'ENOENT') {
                mkdir('modules').then(() => {
                    init().then((c) => {
                        resolve(c);
                    })
                })
            } else {
                reject(e);
            }
        })
    })
}
init().then(files => {
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
        readFile('modules/' + files[i]).then((str) => {
            if (!str.length) return;
            console.log(str)
        })
    }
});


