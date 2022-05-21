//Definiendo analisis lexico
%lex

%options case-insensitive

%%

\s+             // se ignoran los espacios en blanco
"//".*          // comentarios de simple linea

//Definir las palabras reservadas
"print"             return 'RPRINT' 
"true"              return 'RTRUE'
"false"             return 'RFALSE'

//Simbolos
";"                 return 'PUNTOYCOMA'
"("                 return 'PARA'
")"                 return 'PARC'

//Expresiones regulares
\"[^\"]*\"              { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
\'[^\"]\'              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }       
[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';

<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column)}

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


EXP: DECIMAL    {$$ = new Primitivos.Primitivos(TIPO.TIPO.DECIMAL, $1,@1.first_line, @1.first_column )}
   | ENTERO     {$$ = new Primitivos.Primitivos(TIPO.TIPO.ENTERO, $1,@1.first_line, @1.first_column  )}
   | RTRUE      {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, true,@1.first_line, @1.first_column  )}
   | RFALSE     {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, false,@1.first_line, @1.first_column  )}
   | CADENA     {$$ = new Primitivos.Primitivos(TIPO.TIPO.CADENA, $1,@1.first_line, @1.first_column  )}
   | CARACTER   {$$ = new Primitivos.Primitivos(TIPO.TIPO.CARACTER, $1,@1.first_line, @1.first_column  )} 
   ;