import { Instruccion } from "../Abstract/Instruccion"
import { Excepcion } from "./Excepcion"
import { TablaSimbolos } from "./TablaSimbolos"
import { Simbolo } from "./Simbolo"
import { Funcion } from "../Instrucciones/Funcion"

export class Arbol{
    instrucciones:Instruccion[]
    expeciones:Excepcion[]=[]
    funciones:Funcion[]=[]
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

    addFuncion(funcion:Funcion):void{
        this.funciones.push(funcion)
    }

    getFuncion(nombre:string):any{
        for(var funcion of this.funciones){
            if(funcion.nombre == nombre){
                return funcion
            }
        }
        return null
    }
}