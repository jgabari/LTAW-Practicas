// Objetos literales

const objeto1 = {
    nombre: "objeto-1",
    valor: 10,
    test: true
};

// Imprimir las propiedades
console.log("Nombre: " + objeto1.nombre);
console.log("Valor: " + objeto1["valor"]);
const {valor, nombre, test} = objeto1;
console.log("Test: " + test);

// Comprobar si un objeto tiene una propiedad
if ("test" in objeto1) {
    console.log("\n Tiene propiedad test");
}

// Recorrer todas las propiedades
console.log("");
for (prop in objeto1) {
    console.log(`Propiedad: ${prop} --> Valor: ${objeto1[prop]}`);
}
