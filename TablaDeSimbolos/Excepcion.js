"use strict";
exports.__esModule = true;
exports.Excepcion = void 0;
var Excepcion = /** @class */ (function () {
    function Excepcion(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    Excepcion.prototype.toString = function () {
        return this.tipo + " - " + this.descripcion + " [" + String(this.fila) + "," + String(this.columna);
    };
    return Excepcion;
}());
exports.Excepcion = Excepcion;
