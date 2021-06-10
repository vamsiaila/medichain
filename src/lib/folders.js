const fs = require('fs');

module.exports = () => {
    const folders = [
        `${global.ROOT_PATH}/.keys`
    ];
    for (let i = 0; i < folders.length; i++) {
        if(!fs.existsSync(folders[i])) {
            fs.mkdirSync(folders[i]);
        }
    }
}
