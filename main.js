var fs = require('fs')
var parser = require('./Gramatica/Gramatica')
const Arbol = require('./TablaDeSimbolos/Arbol')
const TablaDeSimbolos = require('./TablaDeSimbolos/TablaSimbolos')

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    var instrucciones = parser.parse(data.toString());
    var ast = new Arbol.Arbol(instrucciones)
    TSGlobal = TablaDeSimbolos.TablaSimbolos()

    for(var instruccion of ast.getInstrucciones()){
        instruccion.Interpretar(ast, TSGlobal)
    }

    consola = ast.getConsola();
    console.log(consola)   
});