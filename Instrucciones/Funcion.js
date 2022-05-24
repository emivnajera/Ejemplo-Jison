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
exports.Funcion = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var TablaSimbolos_1 = require("../TablaDeSimbolos/TablaSimbolos");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Return_1 = require("../Instrucciones/Return");
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(nombre, parametros, instrucciones, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.tipo = Tipo_1.TIPO.VOID;
        _this.nombre = nombre;
        _this.instrucciones = instrucciones;
        _this.parametros = parametros;
        return _this;
    }
    Funcion.prototype.Interpretar = function (tree, table) {
        var nuevaTabla = new TablaSimbolos_1.TablaSimbolos(table);
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var iinstruccion = _a[_i];
            var value = iinstruccion.Interpretar(tree, nuevaTabla);
            if (value instanceof Excepcion_1.Excepcion) {
                return value;
            }
            if (value instanceof Return_1.Return) {
                this.tipo = value.tipo;
                return value.result;
            }
        }
        return null;
    };
    return Funcion;
}(Instruccion_1.Instruccion));
exports.Funcion = Funcion;
