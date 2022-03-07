// Importar el módulo FS
const fs = require('fs');

console.log("Lectura asíncrona de un fichero");

// Leer
const data = fs.readFile('fich1.txt', 'utf-8', (err, data) => {
    // Cuando los datos ya están disponibles
    console.log("Lectura completada.");
    console.log("Contenido del fichero:\n");
    console.log(data);
});

console.log("Esperando al sistema de ficheros...");