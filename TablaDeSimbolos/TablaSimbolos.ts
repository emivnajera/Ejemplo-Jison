import { Excepcion } from "./Excepcion"
import { Simbolo } from "./Simbolo"

export class TablaSimbolos{
    tabla:Simbolo[] = []
    anterior:TablaSimbolos|null
    funciones:any[] = []
    constructor(anterior:TablaSimbolos){
        this.anterior = anterior
    }


    setTabla(simbolo:Simbolo):any{
        let encontrado:boolean = false
        for(var tsimbolo of this.tabla){
            if(simbolo.id == tsimbolo.id){
                encontrado = true
            }
        }
        if(encontrado){
            return new Excepcion("Semantico", "Variable Ya Existe", simbolo.fila, simbolo.columna)
        }else{
            this.tabla.push(simbolo)
        }

        return null
    }

    getTabla(id:string):any{
        let tablaActual:TablaSimbolos|null = this
        while (tablaActual != null){
            let result:Simbolo|null =  null
            let encontrado:boolean = false
            for(var simbolo of tablaActual.tabla){
                if (id == simbolo.id){
                    result = simbolo
                    encontrado = true
                }
            }

            if (encontrado){
                return result
            }else
            tablaActual = tablaActual.anterior
        }
        return null
    }

    actualizarTabla(simbolo:Simbolo){
        let tablaActual:TablaSimbolos|null = this
        while (tablaActual != null){
            let encontrado:boolean = false
            for(var tsimbolo of tablaActual.tabla){
                if (simbolo.id == tsimbolo.id){
                    tsimbolo.valor = simbolo.valor
                    tsimbolo.tipo = simbolo.tipo
                    encontrado = true
                    return null
                }
            }
            if(!encontrado){
                tablaActual = tablaActual.anterior
            }
        }
    }
}