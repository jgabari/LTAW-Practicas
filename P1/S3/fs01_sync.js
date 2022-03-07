// Importar el módulo FS
const fs = require('fs');

console.log("Lectura síncrona de un fichero");

// Leer
const data = fs.readFileSync('fich1.txt', 'utf-8');

// Al acabar la lectura síncrona
console.log("Lectura completada");

// Mostrar el contenido
console.log("Contenido del fichero:\n");
console.log(data);