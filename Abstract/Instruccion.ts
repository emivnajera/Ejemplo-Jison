

import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"

export abstract class Instruccion{
    fila:Number
    columna:Number
    constructor(fila:number, columna:number){
        this.fila = fila
        this.columna = columna
    }
    abstract Interpretar(tree:Arbol, table:TablaSimbolos):any;
}