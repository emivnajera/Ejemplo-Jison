import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"
import { If } from "./If"
import { Return } from "../Instrucciones/Return"

export class While extends Instruccion{
    condicion:any
    instrucciones:Instruccion[]

    constructor(condicion:any, instrucciones:Instruccion[], fila:number, columna:number){
        super(fila,columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        while(true){
            let condicion = this.condicion.Interpretar(tree, table)
            if(condicion instanceof Excepcion){
                return Excepcion
            }

            if(this.condicion.tipo == TIPO.BOOLEANO){
                if(condicion){
                    let nuevaTabla = new TablaSimbolos(table)
                    for(var instruccion of this.instrucciones){
                        let result = instruccion.Interpretar(tree,nuevaTabla)
                        if(result instanceof Excepcion){
                            return result
                        }
                        
                        if(result instanceof Return){
                            return result
                        }
                    }
                }else{
                    break
                }
            }else{
                return new Excepcion("Semantico", "Tipo de Dato no Booleano en While", this.fila, this.columna)
            }
        }
    }

}