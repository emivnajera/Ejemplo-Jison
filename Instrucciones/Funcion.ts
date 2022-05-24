import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"
import { Return } from "../Instrucciones/Return"

export class Funcion extends Instruccion{
    nombre:string
    instrucciones:Instruccion[]
    parametros:any[]
    tipo:TIPO = TIPO.VOID
    constructor(nombre:string,parametros:any[],  instrucciones:Instruccion[],fila:number, columna:number){
        super(fila,columna)
        this.nombre = nombre
        this.instrucciones = instrucciones
        this.parametros = parametros        
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let nuevaTabla = new TablaSimbolos(table)
        
        for(var iinstruccion of this.instrucciones){
            let value = iinstruccion.Interpretar(tree, nuevaTabla)
            if(value instanceof Excepcion){
                return value
            }
            if(value instanceof Return){
                this.tipo = value.tipo
                return value.result
            }
        }
        
        return null
    }
}