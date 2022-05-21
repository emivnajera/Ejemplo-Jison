import { Instruccion } from "../Abstract/Instruccion"
import { Excepcion } from "./Excepcion"
import { TablaSimbolos } from "./TablaSimbolos"

export class Arbol{
    instrucciones:Instruccion[]
    expeciones:Excepcion[]=[]
    funciones:any[]=[]
    consola:string = ""
    TSglobal:TablaSimbolos|null = null

    constructor(instrucciones:Instruccion[]){
        this.instrucciones = instrucciones
    }

    getInstrucciones():Instruccion[]{
        return this.instrucciones
    }

    setInstrucciones(instrucciones:Instruccion[]):void{
        this.instrucciones = instrucciones
    }

    getExcepciones():Excepcion[]{
        return this.expeciones
    }

    setExcepciones(excepciones:Excepcion[]):void{
        this.expeciones = excepciones
    }

    getConsola():string{
        return this.consola
    }

    updateConsola(cadena:string):void{
        this.consola = this.consola + cadena + "\n"
    }

    getTSGlobal(TSglobal:TablaSimbolos){
        this.TSglobal = TSglobal
    }
}