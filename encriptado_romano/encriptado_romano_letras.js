const argv = require('yargs')

argv
	.usage('Uso: $0 <tabla> [opciones]')
	.command('romano', 'agrega la cadena que deseas encriptar')
	.example(
		'$0 -c cadena -cm cadena ',
		'encripta la cadena pasada con el encriptado romano con segunda cadena de intercambio'
	)
	.alias('cm', 'cadena_modificar')
	.nargs('cm', 1)
	.alias('c', 'cadena')
	.nargs('c', 1)
	.demandOption(['cm', 'c'])
	.help('h')
	.alias('h', 'help')
	.epilog('copyright 2019').argv

// letra de inicio mas cierta cantidad de valores a agregar
//97 -- 122
;(function(cadena, cm) {
	let arreglo_letras = []
	let i = 0
	for (let index = 'a'.charCodeAt(); index <= 'z'.charCodeAt(); index++) {
		arreglo_letras[i] = String.fromCharCode(index)
		console.log(i + 1, String.fromCharCode(index))

		i++
	}
	console.log(arreglo_letras)

	let cadena_modificar = cm.split(' ') //* subdivide en arreglos en donde se pone espacio para separar las palabras

	let arreglo_cadena = cadena.split(' ')

	let nuevo_arreglo = [
		...arreglo_cadena.map((item, index) => {
			let arreglo_cadena_interno = item.split('')
			let cadena_modificar_interno = cadena_modificar[index].split('')

			return arreglo_cadena_interno.map((item_interno, index_interno) => {
				let n =
					arreglo_letras.indexOf(cadena_modificar_interno[index_interno]) + 1
				return String.fromCharCode(
					((item_interno.charCodeAt() + n - 97) % 25) + 97
				)
			}).join('')
		})
	].join(' ')
	console.log(cadena_modificar, arreglo_cadena, nuevo_arreglo)

	console.log('a'.charCodeAt(), 'z'.charCodeAt())
})(argv.argv.cadena, argv.argv.cadena_modificar)
