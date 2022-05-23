import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class Llamada extends Instruccion{
    nombre:string
    parametros:any[]
    tipo:TIPO|null = null
    constructor(nombre:string, parametros:any[], fila:number, columna:number){
        super(fila,columna)
        this.nombre= nombre
        this.parametros = parametros
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let result = tree.getFuncion(this.nombre)
        if (result == null){
            return new Excepcion("Semantico","No se Encontro la Funcion", this.fila, this.columna)
        }
        let nuevaTabla = new TablaSimbolos(tree.TSglobal)


        if (this.parametros.length == result.parametros.length){
            let contador:number = 0
            for(var expresion of this.parametros){
                let resultExpresion = expresion.Interpretar(tree, table)
                if( resultExpresion instanceof Excepcion){
                    return resultExpresion
                }

                let simbolo = new Simbolo(result.parametros[contador], expresion.tipo, this.fila, this.columna, resultExpresion)
                let resultTabla = nuevaTabla.setTabla(simbolo)
                if (resultTabla instanceof Excepcion){
                    return resultTabla
                }
                contador++
            }
        }else{
            return new Excepcion("Semantico", "Cantidad de Parametros Incorrecta.", this.fila, this.columna)
        }
        let value = result.Interpretar(tree,nuevaTabla)
        if(value instanceof Excepcion){
            return value
        }
        this.tipo = result.tipo
        return value
    }
}