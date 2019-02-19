const argv = require('yargs')

argv
	.usage('Uso: $0 <tabla> [opciones]')
	.command('romano', 'agrega la cadena que deseas encriptar')
	.example(
		'$0 -c cadena -n 10 ',
		'encripta la cadena pasada con el encriptado romano'
	)
	.alias('n', 'numero')
	.nargs('n', 1)
	.alias('c', 'cadena')
	.nargs('c', 1)
	.demandOption(['n', 'c'])
	.help('h')
	.alias('h', 'help')
	.epilog('copyright 2019').argv

// letra de inicio mas cierta cantidad de valores a agregar
//97 -- 122
;(function(cadena, n) {
	let numero = +n
    console.log(+n % 25 + 122)
	let arreglo_cadena = cadena.split(' ')
	arreglo_cadena = [
		...arreglo_cadena.map((i) =>
			i
				.split('')
				.map((x) => {
                    
                    return String.fromCharCode((x.charCodeAt() +n -97)% 26+97 )
                })
				.join('')
		)
	].join(' ')
	console.log(arreglo_cadena)
})(argv.argv.cadena, argv.argv.numero)
