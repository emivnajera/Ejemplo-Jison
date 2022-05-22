"use strict";
exports.__esModule = true;
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(id, tipo, fila, columna, valor) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.getValor = function () {
        return this.valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
