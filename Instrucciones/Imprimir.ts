import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"

export class Imprimir extends Instruccion{
    expresion:Instruccion
    constructor(expresion:Instruccion, fila:number, columna:number){
        super(fila,columna)
        this.expresion = expresion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let value = this.expresion.Interpretar(tree, table)
        if(value instanceof Excepcion){
            return value
        }

        tree.updateConsola(String(value))

    }
}