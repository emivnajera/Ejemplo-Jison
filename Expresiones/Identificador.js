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
exports.identificador = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var identificador = /** @class */ (function (_super) {
    __extends(identificador, _super);
    function identificador(identificador, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.identificador = identificador;
        return _this;
    }
    identificador.prototype.Interpretar = function (tree, table) {
        var simbolo = table.getTabla(this.identificador.toLowerCase());
        if (simbolo == null) {
            return new Excepcion_1.Excepcion("Semantico", "Variable no Existe", this.fila, this.columna);
        }
        this.tipo = simbolo.getTipo();
        return simbolo.getValor();
    };
    return identificador;
}(Instruccion_1.Instruccion));
exports.identificador = identificador;
