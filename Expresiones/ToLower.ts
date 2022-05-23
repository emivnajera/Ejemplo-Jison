import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class ToLower extends Instruccion{
    expresion:any
    constructor(expresion:any,fila:number, columna:number){
        super(fila,columna)
        this.expresion = expresion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let valor = this.expresion.Interpretar(tree,table)
        let cadena:string = String(valor).toLowerCase()
        return cadena
    }
}