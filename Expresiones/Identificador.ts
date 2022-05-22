import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../TablaDeSimbolos/Arbol"
import { TablaSimbolos } from "../TablaDeSimbolos/TablaSimbolos"
import { Excepcion } from "../TablaDeSimbolos/Excepcion"
import { TIPO } from "../TablaDeSimbolos/Tipo"
import { Simbolo } from "../TablaDeSimbolos/Simbolo"

export class identificador extends Instruccion{
    identificador:string
    tipo:TIPO|null = null
    constructor(identificador:string,fila:number,columna:number){
        super(fila,columna)
        this.identificador = identificador
    }

    Interpretar(tree: Arbol, table: TablaSimbolos): any {
        let simbolo = table.getTabla(this.identificador.toLowerCase())

        if (simbolo == null){
            return new Excepcion("Semantico", "Variable no Existe", this.fila, this.columna)
        }

        this.tipo = simbolo.getTipo();

        return simbolo.getValor();
    }
}