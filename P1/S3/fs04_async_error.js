const fs = require('fs');

// Fichero a leer
const FICHERO = 'fich11.txt';

fs.readFile(FICHERO, 'utf-8', (err, data) => {

    if (err) {
        console.log('¡ERROR!');
        console.log(err.message);
    } else {
        console.log("lectura completada");
        console.log('Contenido del fichero\n');
        console.log(data);
    }
})