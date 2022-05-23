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
exports.Incremento = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Simbolo_1 = require("../TablaDeSimbolos/Simbolo");
var Incremento = /** @class */ (function (_super) {
    __extends(Incremento, _super);
    function Incremento(Expresion, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.Expresion = Expresion;
        return _this;
    }
    Incremento.prototype.Interpretar = function (tree, table) {
        var simbolo = table.getTabla(this.Expresion);
        if (simbolo == null) {
            return new Excepcion_1.Excepcion("Semantico", "Variable no Encontrada", this.fila, this.columna);
        }
        this.tipo = simbolo.getTipo();
        var valor_ant = simbolo.getValor();
        var valor_act = Number(valor_ant) + 1;
        var nsimbolo = new Simbolo_1.Simbolo(this.Expresion, this.tipo, this.fila, this.columna, valor_act);
        var result = table.actualizarTabla(nsimbolo);
        return result;
    };
    return Incremento;
}(Instruccion_1.Instruccion));
exports.Incremento = Incremento;
