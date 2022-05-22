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
exports.Declaracion = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Simbolo_1 = require("../TablaDeSimbolos/Simbolo");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(identificador, expresion, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.identificador = identificador;
        _this.expresion = expresion;
        return _this;
    }
    Declaracion.prototype.Interpretar = function (tree, table) {
        var value = this.expresion.Interpretar(tree, table);
        this.tipo = this.expresion.tipo;
        if (value instanceof Excepcion_1.Excepcion) {
            tree.setExcepciones(value);
            return value;
        }
        var simbolo = new Simbolo_1.Simbolo(this.identificador, this.tipo, this.fila, this.columna, value);
        tree.addSimbolo(simbolo);
        var result = table.setTabla(simbolo);
        if (result instanceof Excepcion_1.Excepcion) {
            tree.setExcepciones(result);
            return result;
        }
        return null;
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
