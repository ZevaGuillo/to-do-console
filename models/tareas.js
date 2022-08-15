require('colors');
const Tarea = require("./tarea");

class Tareas{

    get listadoArr(){

        const listado = [];

        // retorna un arreglo de listado 
        Object.keys(this._listado).forEach( key => {

            listado.push(this._listado[key]);

        } );


        return listado

    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if( this._listado[id] ){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea 
        })

    }

    crearTarea(desc = ''){
        const tarea =  new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log('\n');

        this.listadoArr.forEach((tarea, ind) => {
            let index = `${ind + 1}`.green
            let state = (tarea.completadoEn)
                            ?'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${index}. ${tarea.desc} :: ${state}`)
        })

    }

    listarPendientesCompletadas( completadas = true){

        this.listadoArr.filter( tarea => {
                            if(completadas){
                                return tarea.completadoEn !== null;
                            }else{
                                return tarea.completadoEn == null;
                            }
                        })
                        .forEach( (tarea, ind) => {
                            let index = `${ind + 1}`.green
                            let state = (tarea.completadoEn)
                                            ? tarea.completadoEn.green
                                            : 'Pendiente'.red;

                            console.log(`${index}. ${tarea.desc} :: ${state}`)
                        })
        

    }

    toggleCompletadas( ids = [] ){

        // marcar tareas completadas
        ids.forEach( id => {
            const tarea = this._listado[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        } );

        // marcar tareas pendientes
        this.listadoArr.forEach( tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }

}

module.exports = Tareas;