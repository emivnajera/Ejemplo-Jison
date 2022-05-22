import { Instruccion } from "../Abstract/Instruccion";
import { Arbol } from "../TablaDeSimbolos/Arbol";
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos";
import { OperadorAritmetico, OperadorRelacional } from "../TablaDeSimbolos/Tipo";
import { TIPO } from "../TablaDeSimbolos/Tipo";
import { Excepcion } from "../TablaDeSimbolos/Excepcion";

export class Relacional extends Instruccion{
    operador: OperadorRelacional
    OperacionIzq: any
    OperacionDer: any
    tipo:TIPO|null = null

    constructor(operador:OperadorRelacional, OperacionIzq:any, OperacionDer:any, fila:number, columna:number){
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


        let der = this.OperacionDer.Interpretar(tree,table)
        if(der instanceof Excepcion){
            tree.setExcepciones(der)
            return der
        }

        //MenorQue
        if (this.operador == OperadorRelacional.MENORQUE){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) < this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) < this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) < (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) < (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) < Number(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            return new Excepcion("Semantico", "Tipo Erroneo para Operacion< ", this.fila, this.columna)
        }
        //Mayor Que
        if (this.operador == OperadorRelacional.MAYORQUE){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) > this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) > this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) > (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) > (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) > Number(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            return new Excepcion("Semantico", "Tipo Erroneo para Operacion > ", this.fila, this.columna)
        }
        //Mayor Igual
        if (this.operador == OperadorRelacional.MAYORIGUAL){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) >= this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) >= this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) >= (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) >= (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) >= Number(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            return new Excepcion("Semantico", "Tipo Erroneo para Operacion >= ", this.fila, this.columna)
        }
        //Menor Igual
        if (this.operador == OperadorRelacional.MENORIGUAL){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) <= this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) <= this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) <= (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) <= (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) <= Number(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            return new Excepcion("Semantico", "Tipo Erroneo para Operacion <= ", this.fila, this.columna)
        }
        //Diferente
        if (this.operador == OperadorRelacional.DIFERENTE){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) != this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CADENA && this.OperacionDer.tipo == TIPO.CADENA){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CADENA && this.OperacionDer.tipo == TIPO.CARACTER){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) != String(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CADENA){
                return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) != this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CARACTER){
                return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) != String(this.obtenerVal(this.OperacionDer.tipo,der))
            }
            return new Excepcion("Semantico", "Tipo Erroneo para Operacion != ", this.fila, this.columna)
        }
        //Igual Igual
        if (this.operador == OperadorRelacional.IGUALIGUAL){
            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
            return this.obtenerVal(this.OperacionIzq.tipo,izq) == this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == (this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CADENA && this.OperacionDer.tipo == TIPO.CADENA){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CADENA && this.OperacionDer.tipo == TIPO.CARACTER){
                return this.obtenerVal(this.OperacionIzq.tipo,izq) == String(this.obtenerVal(this.OperacionDer.tipo,der))
            }

            if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CADENA){
                return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) == this.obtenerVal(this.OperacionDer.tipo,der)
            }

            if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CARACTER){
                return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) == String(this.obtenerVal(this.OperacionDer.tipo,der))
            }
            return new Excepcion("Semantico", "Tipo Erroneo para Operacion == ", this.fila, this.columna)
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