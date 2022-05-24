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
exports.While = void 0;
var Instruccion_1 = require("../Abstract/Instruccion");
var TablaSimbolos_1 = require("../TablaDeSimbolos/TablaSimbolos");
var Excepcion_1 = require("../TablaDeSimbolos/Excepcion");
var Tipo_1 = require("../TablaDeSimbolos/Tipo");
var Return_1 = require("../Instrucciones/Return");
var While = /** @class */ (function (_super) {
    __extends(While, _super);
    function While(condicion, instrucciones, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.condicion = condicion;
        _this.instrucciones = instrucciones;
        return _this;
    }
    While.prototype.Interpretar = function (tree, table) {
        while (true) {
            var condicion = this.condicion.Interpretar(tree, table);
            if (condicion instanceof Excepcion_1.Excepcion) {
                return Excepcion_1.Excepcion;
            }
            if (this.condicion.tipo == Tipo_1.TIPO.BOOLEANO) {
                if (condicion) {
                    var nuevaTabla = new TablaSimbolos_1.TablaSimbolos(table);
                    for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
                        var instruccion = _a[_i];
                        var result = instruccion.Interpretar(tree, nuevaTabla);
                        if (result instanceof Excepcion_1.Excepcion) {
                            return result;
                        }
                        if (result instanceof Return_1.Return) {
                            return result;
                        }
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de Dato no Booleano en While", this.fila, this.columna);
            }
        }
    };
    return While;
}(Instruccion_1.Instruccion));
exports.While = While;
