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
"+"                 return 'MAS'
"-"                 return 'MENOS'
"*"                 return 'POR'
"/"                 return 'DIV'
"%"                 return 'MOD'
">="                return 'MAYORIGUAL'
"<="                return 'MENORIGUAL'
"<"                 return 'MENOR'
">"                 return 'MAYOR'
"!="                return 'DIFERENTE'
"=="                return 'IGUALIGUAL'
"||"                return 'OR'
"&&"                return 'AND'
"!"                 return 'NOT'


//Expresiones regulares
\"[^\"]*\"              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\"]\'              { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }       
[0-9]+"."[0-9]+\b       return 'DECIMAL';
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
    const Aritmeticas = require('../Expresiones/Aritmetica')
    const Relacionales = require('../Expresiones/Relacional')
    const Logicas = require('../Expresiones/Logica')
%}

// Precedencia de operadores
%left 'OR'
%left 'AND'
%left 'UNOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIV' 'MOD'
%right UMENOS





//Iniciando la gramatica
//Indicamos la produccion inicial
%start S

%%

S: INSTRUCCIONES EOF {$$ = $1; return $$} ;


INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {if ($2 != ""){$1.push($2)};$$ = $1}
             | INSTRUCCION{if ($1 == ""){$$ = [] }else{ $$ = [$1] }} ;

INSTRUCCION: PRINT{$$=$1};

PRINT:RPRINT PARA EXP PARC PUNTOYCOMA {$$ = new Imprimir.Imprimir($3, @2.first_line, @2.first_column)};


EXP: EXP MAS EXP            {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MAS, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENOS EXP          {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MENOS, $1, $3, @1.first_line, @1.first_column )}
   | EXP POR EXP            {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.POR, $1, $3, @1.first_line, @1.first_column )}
   | EXP DIV EXP            {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.DIV, $1, $3, @1.first_line, @1.first_column )}
   | EXP MOD EXP            {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MOD, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENOR EXP          {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MENORQUE, $1, $3, @1.first_line, @1.first_column )}
   | EXP MAYOR EXP          {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MAYORQUE, $1, $3, @1.first_line, @1.first_column )}
   | EXP MAYORIGUAL EXP     {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MAYORIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENORIGUAL EXP     {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MENORIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP DIFERENTE EXP      {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column )}
   | EXP IGUALIGUAL EXP     {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.IGUALIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP AND EXP            {$$ = new Logicas.Logica(TIPO.OperadorLogico.AND, $1, $3, @1.first_line, @1.first_column )}
   | EXP OR EXP             {$$ = new Logicas.Logica(TIPO.OperadorLogico.OR, $1, $3, @1.first_line, @1.first_column )}
   | MENOS EXP %prec UMENOS {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.UMENOS, $2, null, @1.first_line, @1.first_column )}
   | NOT EXP %prec UNOT     {$$ = new Logicas.Logica(TIPO.OperadorLogico.NOT, $2, null, @1.first_line, @1.first_column )}
   | DECIMAL                {$$ = new Primitivos.Primitivos(TIPO.TIPO.DECIMAL, $1,@1.first_line, @1.first_column )}
   | ENTERO                 {$$ = new Primitivos.Primitivos(TIPO.TIPO.ENTERO, $1,@1.first_line, @1.first_column  )}
   | RTRUE                  {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, true,@1.first_line, @1.first_column  )}
   | RFALSE                 {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, false,@1.first_line, @1.first_column  )}
   | CADENA                 {$$ = new Primitivos.Primitivos(TIPO.TIPO.CADENA, $1,@1.first_line, @1.first_column  )}
   | CARACTER               {$$ = new Primitivos.Primitivos(TIPO.TIPO.CARACTER, $1,@1.first_line, @1.first_column  )} 
   ;