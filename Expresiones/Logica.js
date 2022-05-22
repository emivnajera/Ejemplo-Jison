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
exports.Logica = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Tipo_2 = require("../TablaDeSimbolos/Tipo");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(operador, OperacionIzq, OperacionDer, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.operador = operador;
        _this.OperacionIzq = OperacionIzq;
        _this.OperacionDer = OperacionDer;
        _this.tipo = Tipo_2.TIPO.BOOLEANO;
        return _this;
    }
    Logica.prototype.Interpretar = function (tree, table) {
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
            //And
            if (this.operador == Tipo_1.OperadorLogico.AND) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) && this.obtenerVal(this.OperacionDer.tipo, der);
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para And - ", this.fila, this.columna);
            }
            //And
            if (this.operador == Tipo_1.OperadorLogico.OR) {
                if (this.OperacionIzq.tipo == Tipo_2.TIPO.BOOLEANO && this.OperacionDer.tipo == Tipo_2.TIPO.BOOLEANO) {
                    return this.obtenerVal(this.OperacionIzq.tipo, izq) || this.obtenerVal(this.OperacionDer.tipo, der);
                }
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Or - ", this.fila, this.columna);
            }
        }
        //Not
        if (this.operador == Tipo_1.OperadorLogico.NOT) {
            if (this.OperacionIzq.tipo = Tipo_2.TIPO.BOOLEANO) {
                return !Boolean(izq);
            }
            return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo para Not - ", this.fila, this.columna);
        }
    };
    Logica.prototype.obtenerVal = function (tipo, val) {
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
    return Logica;
}(Instruccion_1.Instruccion));
exports.Logica = Logica;
