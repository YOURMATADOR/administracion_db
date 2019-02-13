const argv = require('yargs')


const usuario = require('./models/usuarios')
const productos = require('./models/productos')

argv
    .usage('Uso: $0 <tabla> [opciones]')
    .command('tabla', 'tabla a poblar con valores aleatorios')
    .example('$0 tabla -t usuarios -n 10', 'Llena la tabla seleccionada con 10 nuevos renglones')
    .alias('t', 'tabla')    
    .nargs('t', 1)
    .describe('t', 'tabla a poblar')
    .alias('n', 'numero')
    .nargs('n', 1)
    .describe('t', 'tabla a poblar')
    .alias('b', 'busqueda')
    .describe('b', 'busqueda para poblar productos')
    .nargs('b', 1)
    .demandOption(['t','n'])
    .help('h')
    .alias('h', 'help')    
    .epilog('copyright 2019')
    .argv;
console.log(argv.argv);


(async (tabla,numero,nombre)=> {
    
    switch (tabla) {
        case 'usuarios':
        try{
            let resultado =await usuario.itinerar(numero)
            console.log(resultado);            
        }
        catch(err){
            console.log(err)            
        }
            break;    
        case 'productos':
        try{
            let resultado =await productos.itinerar(nombre)
            console.log(resultado);            
        }
        catch(err){
            console.log(err)            
        }
            break;    
        default:
        console.log('entrada invalida');                
            break;
    }
})(argv.argv.tabla,argv.argv.numero,argv.argv.busqueda)