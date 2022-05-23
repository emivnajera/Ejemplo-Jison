import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class Asignacion extends Instruccion{
    identificador:string
    expresion:any
    tipo:TIPO|null = null
    constructor(identificador:string, expresion:any, fila:number, columna:number){
        super(fila,columna)
        this.identificador = identificador
        this.expresion = expresion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let value:any

        value = this.expresion.Interpretar(tree, table)
        if(value instanceof Excepcion){
            return value
        }

        this.tipo = this.expresion.tipo

        let simbolo = new Simbolo(this.identificador, this.tipo, this.fila, this.columna, value)

        let result = table.actualizarTabla(simbolo)

        return result
    }
}