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
exports.Relacional = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Tipo_2 = require("../TablaDeSimbolos/Tipo");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(operador, OperacionIzq, OperacionDer, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.operador = operador;
        _this.OperacionIzq = OperacionIzq;
        _this.OperacionDer = OperacionDer;
        _this.tipo = Tipo_2.TIPO.BOOLEANO;
        return _this;
    }
    Relacional.prototype.Interpretar = function (tree, table) {
        var izq = this.OperacionIzq.Interpretar(tree, table);
        if (izq instanceof Excepcion_1.Excepcion) {
            tree.setExcepciones(izq);
            return izq;
        }
        var der = this.OperacionDer.Interpretar(tree, table);
        if (der instanceof Excepcion_1.Excepcion) {
            tree.setExcepciones(der);
            return der;
        }
        //MenorQue
        if (this.operador == Tipo_1.OperadorRelacional.MENORQUE) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) < this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) < this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) < (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) < (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) < Number(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion< ", this.fila, this.columna);
        }
        //Mayor Que
        if (this.operador == Tipo_1.OperadorRelacional.MAYORQUE) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) > this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) > this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) > (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) > (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) > Number(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion > ", this.fila, this.columna);
        }
        //Mayor Igual
        if (this.operador == Tipo_1.OperadorRelacional.MAYORIGUAL) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) >= this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) >= this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) >= (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) >= (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) >= Number(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion >= ", this.fila, this.columna);
        }
        //Menor Igual
        if (this.operador == Tipo_1.OperadorRelacional.MENORIGUAL) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) <= this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) <= this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) <= (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) <= (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return Number(this.obtenerVal(this.OperacionIzq.tipo, izq)) <= Number(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion <= ", this.fila, this.columna);
        }
        //Diferente
        if (this.operador == Tipo_1.OperadorRelacional.DIFERENTE) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CADENA && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CADENA && this.OperacionDer.tipo == Tipo_2.TIPO.CARACTER) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) != String(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) != this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CARACTER) {
                return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) != String(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion != ", this.fila, this.columna);
        }
        //Igual Igual
        if (this.operador == Tipo_1.OperadorRelacional.IGUALIGUAL) {
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.ENTERO && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.ENTERO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.DECIMAL && this.OperacionDer.tipo == Tipo_2.TIPO.DECIMAL) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == (this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CADENA && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CADENA && this.OperacionDer.tipo == Tipo_2.TIPO.CARACTER) {
                return this.obtenerVal(this.OperacionIzq.tipo, izq) == String(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CADENA) {
                return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) == this.obtenerVal(this.OperacionDer.tipo, der);
            }
            if (this.OperacionIzq.tipo == Tipo_2.TIPO.CARACTER && this.OperacionDer.tipo == Tipo_2.TIPO.CARACTER) {
                return String(this.obtenerVal(this.OperacionIzq.tipo, izq)) == String(this.obtenerVal(this.OperacionDer.tipo, der));
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Operacion == ", this.fila, this.columna);
        }
    };
    Relacional.prototype.obtenerVal = function (tipo, val) {
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
    return Relacional;
}(Instruccion_1.Instruccion));
exports.Relacional = Relacional;
