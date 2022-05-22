import { Instruccion } from "../Abstract/Instruccion";
import { Arbol } from "../TablaDeSimbolos/Arbol";
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos";
import { OperadorAritmetico, OperadorLogico, OperadorRelacional } from "../TablaDeSimbolos/Tipo";
import { TIPO } from "../TablaDeSimbolos/Tipo";
import { Excepcion } from "../TablaDeSimbolos/Excepcion";

export class Logica extends Instruccion{
    operador: OperadorLogico
    OperacionIzq: any
    OperacionDer: any
    tipo:TIPO|null = null

    constructor(operador:OperadorLogico, OperacionIzq:any, OperacionDer:any, fila:number, columna:number){
        super(fila,columna)
        this.operador = operador
        this.OperacionIzq = OperacionIzq
        this.OperacionDer = OperacionDer
        this.tipo = TIPO.BOOLEANO
    }

    Interpretar(tree: Arbol, table: TablaSimbolos) {
        let izq = this.OperacionIzq.Interpretar(tree, table)
        if(izq instanceof Excepcion){
            tree.setExcepciones(izq)
            return izq
        }

        if(this.OperacionDer != null){
            let der = this.OperacionDer.Interpretar(tree,table)
            if(der instanceof Excepcion){
                tree.setExcepciones(der)
                return der
            }

            //And
            if (this.operador == OperadorLogico.AND){
                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) && this.obtenerVal(this.OperacionDer.tipo,der)
                }
                return new Excepcion("Semantico", "Tipo Erroneo para And - ", this.fila, this.columna)
            }

            //And
            if (this.operador == OperadorLogico.OR){
                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) || this.obtenerVal(this.OperacionDer.tipo,der)
                }
                return new Excepcion("Semantico", "Tipo Erroneo para Or - ", this.fila, this.columna)
            }
        }
        //Not
        if (this.operador == OperadorLogico.NOT){
            if(this.OperacionIzq.tipo = TIPO.BOOLEANO){
                return !Boolean(izq)
            }
            return new Excepcion("Semantico", "Tipo Erroneo para Not - ", this.fila, this.columna)
        }
    }

    obtenerVal(tipo:TIPO, val:any):any{
        if (tipo == TIPO.ENTERO){
            return Number(val)
        }
        if(tipo == TIPO.DECIMAL){
            return Number(val)
        }

        if(tipo ==  TIPO.BOOLEANO){
            return Boolean(val)
        }

        return String(val)

    }
}