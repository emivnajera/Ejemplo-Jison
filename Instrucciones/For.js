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
exports.For = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var TablaSimbolos_1 = require("../TablaDeSimbolos/TablaSimbolos");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Return_1 = require("../Instrucciones/Return");
var For = /** @class */ (function (_super) {
    __extends(For, _super);
    function For(declaracion, condicion, instrucciones, actualizacion, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.declaracion = declaracion;
        _this.condicion = condicion;
        _this.instrucciones = instrucciones;
        _this.actualizacion = actualizacion;
        return _this;
    }
    For.prototype.Interpretar = function (tree, table) {
        var nuevaTabla = new TablaSimbolos_1.TablaSimbolos(table);
        var declaracion = this.declaracion.Interpretar(tree, nuevaTabla);
        if (declaracion instanceof Excepcion_1.Excepcion) {
            return declaracion;
        }
        while (true) {
            var condicion = this.condicion.Interpretar(tree, nuevaTabla);
            if (condicion instanceof Excepcion_1.Excepcion) {
                return condicion;
            }
            if (this.condicion.tipo == Tipo_1.TIPO.BOOLEANO) {
                if (condicion == true) {
                    for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
                        var instruccion = _a[_i];
                        var result = instruccion.Interpretar(tree, nuevaTabla);
                        if (result instanceof Excepcion_1.Excepcion) {
                            return result;
                        }
                        if (result instanceof Return_1.Return) {
                            return result;
                        }
                        var actualizacion = this.actualizacion.Interpretar(tree, nuevaTabla);
                        if (actualizacion instanceof Excepcion_1.Excepcion) {
                            return actualizacion;
                        }
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de Dato no Booleano en For", this.fila, this.columna);
            }
        }
    };
    return For;
}(Instruccion_1.Instruccion));
exports.For = For;
