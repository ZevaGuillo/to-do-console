const { v4: uuidv4 } = require('uuid');
uuidv4(); 

class Tarea {
    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
