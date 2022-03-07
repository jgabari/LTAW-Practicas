// Importar el módulo FS
const fs = require('fs');

// Fichero a leer
const FICHERO = 'fich11.txt';

try {
    const data = fs.readFileSync(FICHERO, 'utf-8');
    console.log('Lectura completada');
    console.log('Contenido del fichero:\n');
    console.log(data);
} catch (err) {
    console.log('¡ERROR!');
    console.log(err.message);
}