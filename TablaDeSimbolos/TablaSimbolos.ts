import { Simbolo } from "./Simbolo"

export class TablaSimbolos{
    tabla:Simbolo[] = []
    anterior:Simbolo[] =[]
    funciones:any[] = []
    constructor(anterior:Simbolo[]){
        this.anterior = anterior
    }
}