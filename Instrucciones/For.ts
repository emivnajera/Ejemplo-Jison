import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"
import { If } from "./If"
import { Return } from "../Instrucciones/Return"

export class For extends Instruccion{
    declaracion:Instruccion
    condicion:any
    instrucciones:Instruccion[]
    actualizacion:any

    constructor(declaracion:Instruccion,condicion:any, instrucciones:Instruccion[], actualizacion:any,fila:number, columna:number){
        super(fila,columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.instrucciones = instrucciones
        this.actualizacion = actualizacion
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let nuevaTabla = new TablaSimbolos(table)
        let declaracion = this.declaracion.Interpretar(tree, nuevaTabla)

        if(declaracion instanceof Excepcion){
            return declaracion
        }

        while (true){
            let condicion = this.condicion.Interpretar(tree, nuevaTabla)
            if(condicion instanceof Excepcion){
                return condicion
            }
            if (this.condicion.tipo == TIPO.BOOLEANO){
                if(condicion==true){
                    for(var instruccion of this.instrucciones){
                        let result = instruccion.Interpretar(tree,nuevaTabla)
                        if(result instanceof Excepcion){
                            return result
                        }

                        if(result instanceof Return){
                            return result
                        }

                        let actualizacion = this.actualizacion.Interpretar(tree, nuevaTabla)
                        if(actualizacion instanceof Excepcion){
                            return actualizacion
                        }
                    }
                }else{
                    break
                }
            }else{
                return new Excepcion("Semantico", "Tipo de Dato no Booleano en For", this.fila, this.columna)
            }
        }
    }

}