// Construir un URL
const myURL = new URL('http://localhost:8080/mi_tienda/listados.html?articulo=pendrive&color=blanco#descripcion');

// Imprimir cosas de la URL
console.log('  * URL completa: '+ myURL.href);
console.log('  * Origen: ' + myURL.origin);
console.log('    * Protocolo: ' + myURL.protocol);
console.log('    * host: ' + myURL.hostname);
console.log('    * port: ' + myURL.port);
console.log('    * Ruta: ' + myURL.pathname);
console.log('    * Busqueda: ' + myURL.search);

// Recorrer los parametros para imprimirlos
myURL.searchParams.forEach((value, name) => {
    console.log('      * Parametro: ' + name + ' = ' + value);
});

// Imprimir los parametros buscandolos directamente
console.log('    * Articulo: ' + myURL.searchParams.get('articulo'));
console.log('    * Color: ' + myURL.searchParams.get('color'));
console.log('    * Otro: ' + myURL.searchParams.get('otro'));

// Fragmento
console.log('  * Fragmento: ' + myURL.hash);