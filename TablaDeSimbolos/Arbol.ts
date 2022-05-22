import { Instruccion } from "../Abstract/Instruccion"
import { Excepcion } from "./Excepcion"
import { TablaSimbolos } from "./TablaSimbolos"
import { Simbolo } from "./Simbolo"

export class Arbol{
    instrucciones:Instruccion[]
    expeciones:Excepcion[]=[]
    funciones:any[]=[]
    consola:string = ""
    TSglobal:TablaSimbolos|null = null
    simbolos:Simbolo[] = []

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

    setExcepciones(excepcion:Excepcion):void{
        this.expeciones.push(excepcion)
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

    addSimbolo(simbolo:Simbolo):void{
        this.simbolos.push(simbolo)
    }

    getSimbolos():Simbolo[]{
        return this.simbolos
    }
}