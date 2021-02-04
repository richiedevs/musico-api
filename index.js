const { readdir, mkdir } = require('fs').promises;
const { ipcMain } = require('electron');

let main = new EventEmitter(); // Placeholder; TODO - replace with musico's actual main-proccess emitter
let modules = {};

let init = () => {
    return new Promise((resolve, reject) => {
        readdir('modules').then(resolve).catch(e => {
            // If no directory then make one
            if (e.code !== 'ENOENT') reject(e);

            mkdir('modules').then(() => { init().then(resolve) }).catch(reject)
        })
    })
}


init().then(files => {
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
        modules[files[i].replace('.js', '')] = require('./modules/' + files[i]);
    }
});

main.once('ready', () => {
    modules.forEach(async m => m.run())
})




