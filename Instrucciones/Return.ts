import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"
import { If } from "./If"

export class Return extends Instruccion{
    expresion:any
    tipo:any
    result:any
    constructor(expresion:any, fila:number, columna:number){
        super(fila,columna)
        this.expresion = expresion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let result = this.expresion.Interpretar(tree,table)
        if(result instanceof Excepcion){
            return result
        }

        this.tipo = this.expresion.tipo
        this.result = result

        return this
    }

}