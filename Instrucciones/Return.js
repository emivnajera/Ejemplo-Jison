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
exports.Return = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Return = /** @class */ (function (_super) {
    __extends(Return, _super);
    function Return(expresion, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.expresion = expresion;
        return _this;
    }
    Return.prototype.Interpretar = function (tree, table) {
        var result = this.expresion.Interpretar(tree, table);
        if (result instanceof Excepcion_1.Excepcion) {
            return result;
        }
        this.tipo = this.expresion.tipo;
        this.result = result;
        return this;
    };
    return Return;
}(Instruccion_1.Instruccion));
exports.Return = Return;
