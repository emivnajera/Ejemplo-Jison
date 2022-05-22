import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class Declaracion extends Instruccion{
    identificador:string
    expresion:any
    tipo:TIPO|null = null
    constructor(identificador:string, expresion:any,fila:number,columna:number){
        super(fila,columna)
        this.identificador = identificador
        this.expresion = expresion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let value = this.expresion.Interpretar(tree, table)
        this.tipo = this.expresion.tipo
        if(value instanceof Excepcion){
            tree.setExcepciones(value)
            return value
        }
        
        let simbolo = new Simbolo(this.identificador, this.tipo, this.fila, this.columna, value)

        tree.addSimbolo(simbolo)

        let result = table.setTabla(simbolo)

        if (result instanceof Excepcion){
            tree.setExcepciones(result)
            return result
        }

        return null
    }
}