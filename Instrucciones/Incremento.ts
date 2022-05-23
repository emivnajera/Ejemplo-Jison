import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"
import { If } from "./If"

export class Incremento extends Instruccion{
    Expresion:any
    tipo:any = null
    condicion:any
    instrucciones:Instruccion[]

    constructor(Expresion:any, fila:number, columna:number){
        super(fila,columna)
        this.Expresion = Expresion

    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
       let simbolo:Simbolo = table.getTabla(this.Expresion)
       if (simbolo == null){
        return new Excepcion("Semantico","Variable no Encontrada", this.fila, this.columna)
       }
       this.tipo = simbolo.getTipo()

       let valor_ant = simbolo.getValor()

       let valor_act = Number(valor_ant)+ 1
       
       let nsimbolo = new Simbolo(this.Expresion, this.tipo, this.fila, this.columna, valor_act)

       let result = table.actualizarTabla(nsimbolo)

       return result

    }

}