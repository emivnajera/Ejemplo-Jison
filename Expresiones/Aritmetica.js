"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Aritmetica = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Tipo_2 = require("../TablaDeSimbolos/Tipo");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(operador, OperacionIzq, OperacionDer, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.operador = operador;
        _this.OperacionIzq = OperacionIzq;
        _this.OperacionDer = OperacionDer;
        return _this;
    }
    Aritmetica.prototype.Interpretar = function (tree, table) {
        var izq = this.OperacionIzq.Interpretar(tree, table);
        if (izq instanceof Excepcion_1.Excepcion) {
            tree.setExcepciones(izq);
            return izq;
        }
        if (this.OperacionDer != null) {
            var der = this.OperacionDer.Interpretar(tree, table);
            if (der instanceof Excepcion_1.Excepcion) {
                tree.setExcepciones(der);
                return der;
            }
            //Suma
            if (this.operador == Tipo_1.OperadorAritmetico.MAS) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + Number(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                    this.tipo = Tipo_2.TIPO.CADENA;
                    return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) + String(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) + Number((this.obtenerVal(this.OperacionDer.tipo, der)));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                    this.tipo = Tipo_2.TIPO.CADENA;
                    return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) + (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) + (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) + (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) + Number(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.CADENA) {
                    this.tipo = Tipo_2.TIPO.CADENA;
                    return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) + String(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CARACTER) {
                    this.tipo = Tipo_2.TIPO.CADENA;
                    return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) + String(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                    this.tipo = Tipo_2.TIPO.CADENA;
                    return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) + String(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Suma - ", this.fila, this.columna);
            }
            //Resta
            if (this.operador == Tipo_1.OperadorAritmetico.MENOS) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - Number(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) - Number((this.obtenerVal(this.OperacionDer.tipo, der)));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) - (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) - (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) - Number(this.obtenerVal(this.OperacionDer.tipo, der));
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Resta - ", this.fila, this.columna);
            }
            //Multiplicacion
            if (this.operador == Tipo_1.OperadorAritmetico.POR) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.ENTERO;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) * this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) * this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) * (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) * (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Multiplicacion - ", this.fila, this.columna);
            }
            //Division
            if (this.operador == Tipo_1.OperadorAritmetico.DIV) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) / this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) / this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) / (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) / (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Division - ", this.fila, this.columna);
            }
            //Modulo
            if (this.operador == Tipo_1.OperadorAritmetico.MOD) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) % this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) % this.obtenerVal(this.OperacionDer.tipo, der);
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) % (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                    this.tipo = Tipo_2.TIPO.DECIMAL;
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) % (this.obtenerVal(this.OperacionDer.tipo, der));
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Modulo - ", this.fila, this.columna);
            }
        }
        if (this.operador == Tipo_1.OperadorAritmetico.UMENOS) {
            if (this.OperacionIzq.tipo = Tipo_2.TIPO.ENTERO) {
                this.tipo = Tipo_2.TIPO.ENTERO;
                return -1 * this.obtenerVal(this.OperacionIzq, izq);
            }
            if (this.OperacionIzq.tipo = Tipo_2.TIPO.DECIMAL) {
                this.tipo = Tipo_2.TIPO.DECIMAL;
                return -1 * this.obtenerVal(this.OperacionIzq, izq);
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para UMENOS - ", this.fila, this.columna);
        }
    };
    Aritmetica.prototype.obtenerVal = function (tipo, val) {
        if (tipo == Tipo_2.TIPO.ENTERO) {
            return Number(val);
        }
        if (tipo == Tipo_2.TIPO.DECIMAL) {
            return Number(val);
        }
        if (tipo == Tipo_2.TIPO.BOOLEANO) {
            return Boolean(val);
        }
        return String(val);
    };
    return Aritmetica;
}(Instruccion_1.Instruccion));
exports.Aritmetica = Aritmetica;
