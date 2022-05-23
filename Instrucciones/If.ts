import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class If extends Instruccion{
    condicion:any
    instruccionesIf:Instruccion[]
    instruccionesElse:Instruccion[]
    constructor(condicion:any, instruccionesIf:Instruccion[], instruccionesElse:Instruccion[], fila:number, columna:number){
        super(fila,columna)
        this.condicion = condicion
        this.instruccionesIf = instruccionesIf
        this.instruccionesElse = instruccionesElse
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let condicion = this.condicion.Interpretar(tree, table)
        if(condicion instanceof Excepcion){
            return condicion
        }

        if (this.condicion.tipo = TIPO.BOOLEANO){
            if (condicion == true){
                let nuevaTabla = new TablaSimbolos(table)
                for(var instruccion of this.instruccionesIf){
                   let result = instruccion.Interpretar(tree, nuevaTabla)
                    if (result instanceof Excepcion){
                        return result
                    }

                }
            }else{
                if (this.instruccionesElse != []){
                    let nuevaTabla = new TablaSimbolos(table)
                    for(var instruccion of this.instruccionesElse){
                        let result = instruccion.Interpretar(tree, nuevaTabla)
                         if (result instanceof Excepcion){
                             return result
                         }
                }
            }
        }
    }
}
}