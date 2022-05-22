import { Instruccion } from "../Abstract/Instruccion";
import { Arbol } from "../TablaDeSimbolos/Arbol";
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos";
import { OperadorAritmetico } from "../TablaDeSimbolos/Tipo";
import { TIPO } from "../TablaDeSimbolos/Tipo";
import { Excepcion } from "../TablaDeSimbolos/Excepcion";

export class Aritmetica extends Instruccion{
    operador: OperadorAritmetico
    OperacionIzq: any
    OperacionDer: any
    tipo:TIPO|null = null

    constructor(operador:OperadorAritmetico, OperacionIzq:any, OperacionDer:any, fila:number, columna:number){
        super(fila,columna)
        this.operador = operador
        this.OperacionIzq = OperacionIzq
        this.OperacionDer = OperacionDer
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

            //Suma
            if (this.operador == OperadorAritmetico.MAS){
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
                this.tipo = TIPO.ENTERO
                return this.obtenerVal(this.OperacionIzq.tipo,izq) + this.obtenerVal(this.OperacionDer.tipo,der)
                }

                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) + this.obtenerVal(this.OperacionDer.tipo,der)
                }

                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.ENTERO
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) + Number(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.CADENA){
                    this.tipo = TIPO.CADENA
                    return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) + String(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) + (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) + (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) + Number((this.obtenerVal(this.OperacionDer.tipo,der)))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.CADENA){
                    this.tipo = TIPO.CADENA
                    return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) + (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.ENTERO
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) + (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) + (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.ENTERO
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) + Number(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.CADENA){
                    this.tipo = TIPO.CADENA
                    return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) + String(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CARACTER){
                    this.tipo = TIPO.CADENA
                    return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) + String(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.CARACTER && this.OperacionDer.tipo == TIPO.CADENA){
                    this.tipo = TIPO.CADENA
                    return String(this.obtenerVal(this.OperacionIzq.tipo,izq)) + String(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                return new Excepcion("Semantico", "Tipo Erroneo para Suma - ", this.fila, this.columna)

            }
            //Resta
            if (this.operador == OperadorAritmetico.MENOS){
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
                this.tipo = TIPO.ENTERO
                return this.obtenerVal(this.OperacionIzq.tipo,izq) - this.obtenerVal(this.OperacionDer.tipo,der)
                }

                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) - this.obtenerVal(this.OperacionDer.tipo,der)
                }

                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.ENTERO
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) - Number(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) - (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) - (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) - Number((this.obtenerVal(this.OperacionDer.tipo,der)))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.ENTERO
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) - (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) - (this.obtenerVal(this.OperacionDer.tipo,der))
                }

                if (this.OperacionIzq.tipo == TIPO.BOOLEANO && this.OperacionDer.tipo == TIPO.BOOLEANO){
                    this.tipo = TIPO.ENTERO
                    return Number(this.obtenerVal(this.OperacionIzq.tipo,izq)) - Number(this.obtenerVal(this.OperacionDer.tipo,der))
                }

                return new Excepcion("Semantico", "Tipo Erroneo para Resta - ", this.fila, this.columna)

            }
            //Multiplicacion
            if (this.operador == OperadorAritmetico.POR){
                 if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.ENTERO
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) * this.obtenerVal(this.OperacionDer.tipo,der)
                 }
    
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) * this.obtenerVal(this.OperacionDer.tipo,der)
                }
            
                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) * (this.obtenerVal(this.OperacionDer.tipo,der))
                }
            
                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) * (this.obtenerVal(this.OperacionDer.tipo,der))
                }
            
                return new Excepcion("Semantico", "Tipo Erroneo para Multiplicacion - ", this.fila, this.columna)
            }
            //Division
            if (this.operador == OperadorAritmetico.DIV){
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
                   this.tipo = TIPO.DECIMAL
                   return this.obtenerVal(this.OperacionIzq.tipo,izq) / this.obtenerVal(this.OperacionDer.tipo,der)
                }
   
               if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                   this.tipo = TIPO.DECIMAL
                   return this.obtenerVal(this.OperacionIzq.tipo,izq) / this.obtenerVal(this.OperacionDer.tipo,der)
               }
           
               if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                   this.tipo = TIPO.DECIMAL
                   return this.obtenerVal(this.OperacionIzq.tipo,izq) / (this.obtenerVal(this.OperacionDer.tipo,der))
               }
           
               if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                   this.tipo = TIPO.DECIMAL
                   return this.obtenerVal(this.OperacionIzq.tipo,izq) / (this.obtenerVal(this.OperacionDer.tipo,der))
               }
           
               return new Excepcion("Semantico", "Tipo Erroneo para Division - ", this.fila, this.columna)
           }
            //Modulo
             if (this.operador == OperadorAritmetico.MOD){
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) % this.obtenerVal(this.OperacionDer.tipo,der)
                }
           
                if (this.OperacionIzq.tipo == TIPO.ENTERO && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) % this.obtenerVal(this.OperacionDer.tipo,der)
                }
                   
                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.ENTERO){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) % (this.obtenerVal(this.OperacionDer.tipo,der))
                }
                   
                if (this.OperacionIzq.tipo == TIPO.DECIMAL && this.OperacionDer.tipo == TIPO.DECIMAL){
                    this.tipo = TIPO.DECIMAL
                    return this.obtenerVal(this.OperacionIzq.tipo,izq) % (this.obtenerVal(this.OperacionDer.tipo,der))
                }
                   
                return new Excepcion("Semantico", "Tipo Erroneo para Modulo - ", this.fila, this.columna)
            }
        }

        if (this.operador == OperadorAritmetico.UMENOS){
            if(this.OperacionIzq.tipo = TIPO.ENTERO){
                this.tipo = TIPO.ENTERO
                return -1*this.obtenerVal(this.OperacionIzq, izq)
            }
            if(this.OperacionIzq.tipo = TIPO.DECIMAL){
                this.tipo = TIPO.DECIMAL
                return -1*this.obtenerVal(this.OperacionIzq, izq)
            }

            return new Excepcion("Semantico", "Tipo Erroneo para UMENOS - ", this.fila, this.columna)
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