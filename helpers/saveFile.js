const fs = require('fs');

const path = './db/data.json';

const saveDB = (data) => {
    
    fs.writeFileSync( path, JSON.stringify(data) );

}

const readDB = () => {
    if( !fs.existsSync(path) ){
        return null;
    }

    const info = fs.readFileSync( path, { encoding: 'utf-8'});
    const dataJson = JSON.parse(info);

    return dataJson;
} 

module.exports = {
    saveDB,
    readDB
}