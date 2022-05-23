"use strict";
exports.__esModule = true;
exports.Arbol = void 0;
var Arbol = /** @class */ (function () {
    function Arbol(instrucciones) {
        this.expeciones = [];
        this.funciones = [];
        this.consola = "";
        this.TSglobal = null;
        this.simbolos = [];
        this.instrucciones = instrucciones;
    }
    Arbol.prototype.getInstrucciones = function () {
        return this.instrucciones;
    };
    Arbol.prototype.setInstrucciones = function (instrucciones) {
        this.instrucciones = instrucciones;
    };
    Arbol.prototype.getExcepciones = function () {
        return this.expeciones;
    };
    Arbol.prototype.setExcepciones = function (excepcion) {
        this.expeciones.push(excepcion);
    };
    Arbol.prototype.getConsola = function () {
        return this.consola;
    };
    Arbol.prototype.updateConsola = function (cadena) {
        this.consola = this.consola + cadena + "\n";
    };
    Arbol.prototype.getTSGlobal = function (TSglobal) {
        this.TSglobal = TSglobal;
    };
    Arbol.prototype.addSimbolo = function (simbolo) {
        this.simbolos.push(simbolo);
    };
    Arbol.prototype.getSimbolos = function () {
        return this.simbolos;
    };
    Arbol.prototype.addFuncion = function (funcion) {
        this.funciones.push(funcion);
    };
    Arbol.prototype.getFuncion = function (nombre) {
        for (var _i = 0, _a = this.funciones; _i < _a.length; _i++) {
            var funcion = _a[_i];
            if (funcion.nombre == nombre) {
                return funcion;
            }
        }
        return null;
    };
    return Arbol;
}());
exports.Arbol = Arbol;
