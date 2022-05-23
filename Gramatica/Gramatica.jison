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
"var"               return 'RVAR'
"func"              return 'RFUNC'
"round"             return 'RROUND'
"tolower"           return 'RTOLOWER'
"if"                return 'RIF'
"else"              return 'RELSE'
"while"             return 'RWHILE'
"for"               return 'RFOR'

//Simbolos
";"                 return 'PUNTOYCOMA'
"("                 return 'PARA'
")"                 return 'PARC'
"{"                 return 'LLAVEA'
"}"                 return 'LLAVEC'
","                 return 'COMA'
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
"="                 return 'IGUAL'
"||"                return 'OR'
"&&"                return 'AND'
"!"                 return 'NOT'


//Expresiones regulares
\"[^\"]*\"                  { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\"]\'                   { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }       
[0-9]+"."[0-9]+\b           return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*    return 'ID';

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
    const Declaracion = require('../Instrucciones/Declaracion')
    const Identificador = require('../Expresiones/Identificador')
    const Asignacion = require('../Instrucciones/Asignacion')
    const Funcion = require('../Instrucciones/Funcion')
    const Llamada = require('../Instrucciones/Llamada')
    const Round = require('../Expresiones/Round')
    const tolower = require('../Expresiones/ToLower')
    const If = require('../Instrucciones/If')
    const While = require('../Instrucciones/While')
    const Incremento = require('../Instrucciones/Incremento')
    const For = require('../Instrucciones/For')
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

INSTRUCCION: PRINT                 {$$=$1}
           | DECLARACION           {$$=$1}
           | ASIGNACION            {$$=$1}
           | FUNCION               {$$=$1}
           | LLAMADA               {$$=$1}
           | IF                    {$$=$1}
           | WHILE                 {$$=$1}
           | INCREMENTO PUNTOYCOMA {$$=$1}
           | FOR                   {$$=$1}
           ;

PRINT:RPRINT PARA EXP PARC PUNTOYCOMA                                                             {$$ = new Imprimir.Imprimir($3, @2.first_line, @2.first_column)};

DECLARACION: RVAR ID IGUAL EXP PUNTOYCOMA                                                         {$$ = new Declaracion.Declaracion($2, $4, @2.first_line, @2.first_column)};   

ASIGNACION: ID IGUAL EXP PUNTOYCOMA                                                               {$$ = new Asignacion.Asignacion($1, $3, @2.first_line, @2.first_column)};

LLAMADA: ID PARA PARC PUNTOYCOMA                                                                  {$$ = new Llamada.Llamada($1,[],@2.first_line, @2.first_column)}
       | ID PARA PARAMETROSLL PARC PUNTOYCOMA                                                     {$$ = new Llamada.Llamada($1, $3,@2.first_line, @2.first_column)};

FUNCION: RFUNC ID PARA PARAMETROS PARC LLAVEA INSTRUCCIONES LLAVEC                                {$$ = new Funcion.Funcion($2, $4, $7,@2.first_line, @2.first_column)}
       | RFUNC ID PARA PARC LLAVEA INSTRUCCIONES LLAVEC                                           {$$ = new Funcion.Funcion($2, [], $6,@2.first_line, @2.first_column)};

PARAMETROS: PARAMETROS COMA PARAMETRO                                                             {$1.push($3);$$=$1}
          | PARAMETRO                                                                             {$$ = [$1]};  

PARAMETRO: ID                                                                                     {$$ = $1};

PARAMETROSLL: PARAMETROSLL COMA PARAMETROLL                                                       {$1.push($3);$$=$1}
            | PARAMETROLL                                                                         {$$ = [$1]};      

PARAMETROLL: EXP                                                                                  {$$ = $1};

INCREMENTO: ID MAS MAS                                                                            {$$ = new Incremento.Incremento($1,@2.first_line, @2.first_column )};

FOR: RFOR PARA DECLARACION EXP PUNTOYCOMA INCREMENTO PARC LLAVEA INSTRUCCIONES LLAVEC             {$$ = new For.For($3, $4, $9, $6,@2.first_line, @2.first_column )};

IF: RIF PARA EXP PARC LLAVEA INSTRUCCIONES LLAVEC                                                 {$$ = new If.If($3, $6, [], @1.first_line, @1.first_column)}       
  | RIF PARA EXP PARC LLAVEA INSTRUCCIONES LLAVEC RELSE LLAVEA INSTRUCCIONES LLAVEC               {$$ = new If.If($3, $6, $10, @1.first_line, @1.first_column)};

WHILE: RWHILE PARA EXP PARC LLAVEA INSTRUCCIONES LLAVEC                                           {$$ = new While.While($3, $6, @1.first_line, @1.first_column)};

EXP: EXP MAS EXP                        {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MAS, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENOS EXP                      {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MENOS, $1, $3, @1.first_line, @1.first_column )}
   | EXP POR EXP                        {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.POR, $1, $3, @1.first_line, @1.first_column )}
   | EXP DIV EXP                        {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.DIV, $1, $3, @1.first_line, @1.first_column )}
   | EXP MOD EXP                        {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.MOD, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENOR EXP                      {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MENORQUE, $1, $3, @1.first_line, @1.first_column )}
   | EXP MAYOR EXP                      {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MAYORQUE, $1, $3, @1.first_line, @1.first_column )}
   | EXP MAYORIGUAL EXP                 {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MAYORIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP MENORIGUAL EXP                 {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.MENORIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP DIFERENTE EXP                  {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column )}
   | EXP IGUALIGUAL EXP                 {$$ = new Relacionales.Relacional(TIPO.OperadorRelacional.IGUALIGUAL, $1, $3, @1.first_line, @1.first_column )}
   | EXP AND EXP                        {$$ = new Logicas.Logica(TIPO.OperadorLogico.AND, $1, $3, @1.first_line, @1.first_column )}
   | EXP OR EXP                         {$$ = new Logicas.Logica(TIPO.OperadorLogico.OR, $1, $3, @1.first_line, @1.first_column )}
   | MENOS EXP %prec UMENOS             {$$ = new Aritmeticas.Aritmetica(TIPO.OperadorAritmetico.UMENOS, $2, null, @1.first_line, @1.first_column )}
   | NOT EXP %prec UNOT                 {$$ = new Logicas.Logica(TIPO.OperadorLogico.NOT, $2, null, @1.first_line, @1.first_column )}
   | RROUND PARA EXP PARC               {$$ = new Round.Round($3, @1.first_line, @1.first_column)}
   | RTOLOWER PARA EXP PARC             {$$ = new tolower.ToLower($3, @1.first_line, @1.first_column)}
   | PARA EXP PARC                      {$$ = $2}
   | ID                                 {$$ = new Identificador.identificador($1,@1.first_line, @1.first_column)}
   | DECIMAL                            {$$ = new Primitivos.Primitivos(TIPO.TIPO.DECIMAL, $1,@1.first_line, @1.first_column )}
   | ENTERO                             {$$ = new Primitivos.Primitivos(TIPO.TIPO.ENTERO, $1,@1.first_line, @1.first_column  )}
   | RTRUE                              {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, true,@1.first_line, @1.first_column  )}
   | RFALSE                             {$$ = new Primitivos.Primitivos(TIPO.TIPO.BOOLEANO, false,@1.first_line, @1.first_column  )}
   | CADENA                             {$$ = new Primitivos.Primitivos(TIPO.TIPO.CADENA, $1,@1.first_line, @1.first_column  )}
   | CARACTER                           {$$ = new Primitivos.Primitivos(TIPO.TIPO.CARACTER, $1,@1.first_line, @1.first_column  )} 
   ;