import {Instruccion} from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import {TIPO} from "../TablaDeSimbolos/Tipo"

export class Primitivos extends Instruccion{
    tipo:TIPO
    valor:any
    fila:number
    columna: Number
    constructor(tipo:TIPO, valor:any, fila:number, columna:number){
        super(fila,columna)
        this.tipo = tipo
        this.valor = valor
    }

    Interpretar(tree: Arbol, table: TablaSimbolos) {
        return this.valor
    }

} 