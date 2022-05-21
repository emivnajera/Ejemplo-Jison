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
exports.Imprimir = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Imprimir = /** @class */ (function (_super) {
    __extends(Imprimir, _super);
    function Imprimir(expresion, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.expresion = expresion;
        return _this;
    }
    Imprimir.prototype.Interpretar = function (tree, table) {
        var value = this.expresion.Interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion) {
            return value;
        }
        tree.updateConsola(String(value));
    };
    return Imprimir;
}(Instruccion_1.Instruccion));
exports.Imprimir = Imprimir;
