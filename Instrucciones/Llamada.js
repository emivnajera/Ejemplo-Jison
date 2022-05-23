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
exports.Llamada = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var TablaSimbolos_1 = require("../TablaDeSimbolos/TablaSimbolos");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Simbolo_1 = require("../TablaDeSimbolos/Simbolo");
var Llamada = /** @class */ (function (_super) {
    __extends(Llamada, _super);
    function Llamada(nombre, parametros, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = null;
        _this.nombre = nombre;
        _this.parametros = parametros;
        return _this;
    }
    Llamada.prototype.Interpretar = function (tree, table) {
        var result = tree.getFuncion(this.nombre);
        if (result == null) {
            return new Excepcion_1.Excepcion("Semantico", "No se Encontro la Funcion", this.fila, this.columna);
        }
        var nuevaTabla = new TablaSimbolos_1.TablaSimbolos(tree.TSglobal);
        if (this.parametros.length == result.parametros.length) {
            var contador = 0;
            for (var _i = 0, _a = this.parametros; _i < _a.length; _i++) {
                var expresion = _a[_i];
                var resultExpresion = expresion.Interpretar(tree, table);
                if (resultExpresion instanceof Excepcion_1.Excepcion) {
                    return resultExpresion;
                }
                var simbolo = new Simbolo_1.Simbolo(result.parametros[contador], expresion.tipo, this.fila, this.columna, resultExpresion);
                var resultTabla = nuevaTabla.setTabla(simbolo);
                if (resultTabla instanceof Excepcion_1.Excepcion) {
                    return resultTabla;
                }
                contador++;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Cantidad de Parametros Incorrecta.", this.fila, this.columna);
        }
        var value = result.Interpretar(tree, nuevaTabla);
        if (value instanceof Excepcion_1.Excepcion) {
            return value;
        }
        this.tipo = result.tipo;
        return value;
    };
    return Llamada;
}(Instruccion_1.Instruccion));
exports.Llamada = Llamada;
