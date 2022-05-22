"use strict";
exports.__esModule = true;
exports.OperadorLogico = exports.OperadorRelacional = exports.OperadorAritmetico = exports.TIPO = void 0;
var TIPO;
(function (TIPO) {
    TIPO[TIPO["ENTERO"] = 1] = "ENTERO";
    TIPO[TIPO["DECIMAL"] = 2] = "DECIMAL";
    TIPO[TIPO["BOOLEANO"] = 3] = "BOOLEANO";
    TIPO[TIPO["CARACTER"] = 4] = "CARACTER";
    TIPO[TIPO["CADENA"] = 5] = "CADENA";
})(TIPO = exports.TIPO || (exports.TIPO = {}));
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["MAS"] = 1] = "MAS";
    OperadorAritmetico[OperadorAritmetico["MENOS"] = 2] = "MENOS";
    OperadorAritmetico[OperadorAritmetico["POR"] = 3] = "POR";
    OperadorAritmetico[OperadorAritmetico["DIV"] = 4] = "DIV";
    OperadorAritmetico[OperadorAritmetico["POT"] = 5] = "POT";
    OperadorAritmetico[OperadorAritmetico["MOD"] = 7] = "MOD";
    OperadorAritmetico[OperadorAritmetico["UMENOS"] = 8] = "UMENOS";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
var OperadorRelacional;
(function (OperadorRelacional) {
    OperadorRelacional[OperadorRelacional["MENORQUE"] = 1] = "MENORQUE";
    OperadorRelacional[OperadorRelacional["MAYORQUE"] = 2] = "MAYORQUE";
    OperadorRelacional[OperadorRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OperadorRelacional[OperadorRelacional["MAYORIGUAL"] = 4] = "MAYORIGUAL";
    OperadorRelacional[OperadorRelacional["IGUALIGUAL"] = 5] = "IGUALIGUAL";
    OperadorRelacional[OperadorRelacional["DIFERENTE"] = 6] = "DIFERENTE";
})(OperadorRelacional = exports.OperadorRelacional || (exports.OperadorRelacional = {}));
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["NOT"] = 1] = "NOT";
    OperadorLogico[OperadorLogico["AND"] = 2] = "AND";
    OperadorLogico[OperadorLogico["OR"] = 3] = "OR";
})(OperadorLogico = exports.OperadorLogico || (exports.OperadorLogico = {}));
