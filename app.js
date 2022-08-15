require('colors');
const { inquirerMenu,
        pause,
        readInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    // Leer tareas de json
    const tareasDB = readDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {

        // imprimir el menu
        opt = await inquirerMenu();
        
        switch(opt){
            case '1':
                const desc = await readInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2': // Listar Tareas
                tareas.listadoCompleto();
            break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            
            case '4': // LIstar Pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // completado || pendientes
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
 
            case '6': // borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );

                if( id === '0' ) break

                const ok = await confirmar('¿Está seguro?');

                if( ok ){
                    tareas.borrarTarea( id );
                    console.log('Tarea borrada');
                }

            break;
        }

        saveDB( tareas.listadoArr )

        if (opt !== '0') await pause();

    } while (opt !== '0');

}

main();