import { TIPO } from "./Tipo"

export class Simbolo{
    id:string
    tipo: TIPO
    fila:number
    columna:number
    valor:any
    constructor(id:string, tipo:TIPO, fila:number, columna:number, valor:any){
        this.id = id
        this.tipo = tipo
        this.fila = fila
        this.columna = columna
        this.valor = valor
    }

    getTipo():TIPO{
        return this.tipo
    }

    getValor():any{
        return this.valor
    }
}
