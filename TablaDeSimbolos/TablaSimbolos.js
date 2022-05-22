"use strict";
exports.__esModule = true;
exports.TablaSimbolos = void 0;
var Excepcion_1 = require("./Excepcion");
var TablaSimbolos = /** @class */ (function () {
    function TablaSimbolos(anterior) {
        this.tabla = [];
        this.funciones = [];
        this.anterior = anterior;
    }
    TablaSimbolos.prototype.setTabla = function (simbolo) {
        var encontrado = false;
        for (var _i = 0, _a = this.tabla; _i < _a.length; _i++) {
            var tsimbolo = _a[_i];
            if (simbolo.id == tsimbolo.id) {
                encontrado = true;
            }
        }
        if (encontrado) {
            return new Excepcion_1.Excepcion("Semantico", "Variable Ya Existe", simbolo.fila, simbolo.columna);
        }
        else {
            this.tabla.push(simbolo);
        }
        return null;
    };
    TablaSimbolos.prototype.getTabla = function (id) {
        var tablaActual = this;
        while (tablaActual != null) {
            var result = null;
            var encontrado = false;
            for (var _i = 0, _a = tablaActual.tabla; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (id == simbolo.id) {
                    result = simbolo;
                    encontrado = true;
                }
            }
            if (encontrado) {
                return result;
            }
            else
                tablaActual = tablaActual.anterior;
        }
        return null;
    };
    return TablaSimbolos;
}());
exports.TablaSimbolos = TablaSimbolos;
