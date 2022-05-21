//Definiendo analisis lexico
%lex

%options case-insensitive

%%

\s+             // se ignoran los espacios en blanco
"//".*          // comentarios de simple linea

//Definir las palabras reservadas
"print"             return 'RPRINT' 

//Simbolos
";"                 return 'PUNTOYCOMA'
"("                 return 'PARA'
")"                 return 'PARC'

//Expresiones regulares
[0-9]+("."[0-9]+)?\b    return 'DECIMAL';

<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                          L_Error.getInstance().insertar(new N_Error("Lexico","Caracter: \" "+yytext+"\" no es valido" ,yylloc.first_line,yylloc.first_column));
                                          return null; }

/lex

//Definir el codigo
// Todo codigo javascript, que necesitemos incluir
%{
    const Imprimir = require ('../Instrucciones/Imprimir')
    const Primitivos = require('../Expresiones/Primitivos')
    const TIPO = require('../TablaDeSimbolos/Tipo')
%}

// Precedencia de operadores






//Iniciando la gramatica
//Indicamos la produccion inicial
%start S

%%

S: INSTRUCCIONES EOF {$$ = $1; return $$} ;


INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {if ($2 != ""){$1.push($2)};$$ = $1}
             | INSTRUCCION{if ($1 == ""){$$ = [] }else{ $$ = [$1] }} ;

INSTRUCCION: PRINT{$$=$1};

PRINT:RPRINT PARA EXP PARC PUNTOYCOMA {$$ = new Imprimir.Imprimir($3, @2.first_line, @2.first_column)};


EXP:DECIMAL                         {$$ = new Primitivos.Primitivos(TIPO.TIPO.ENTERO, $1,@1.first_line, @1.first_column )};
