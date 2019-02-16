const db = require('../utils/database')
const uuid = require('uuid/v1')
const request = require('superagent')
const moment = require('moment')

class Provedor {
	constructor() {
		this.rfc = ''
		this.razon = ''
		this.proveedores = []
		this.datos = []
	}
	fecha_random(start = new Date(1960, 0, 1), end = new Date(2000, 0, 1)) {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		)
	}
	generar_rfc(nombre) {
		// Si el nombre de la empresa tiene tres palabras, usar la primera letra de cada una. Si tiene dos, usar la primera de la primer palabra, y las primeras dos de la segunda. Si tiene una, usar sus primeras tres letras.
		// Fecha de constitución de la empresa en formato aa/mm/dd
		// Homoclave (asignada por el SAT)
		let tamaño = nombre.split(' ').length
		let letras = ''
		let fecha = moment(this.fecha_random()).format('YYMMDD')

		let final = ''
		switch (+tamaño) {
            case 1:
            letras = uuid()
			.split('-')[0]
			.slice(0, 3)
				final = nombre
					.split('')
					.slice(0, 3)
					.join('')

				final = final + '' + fecha
				final = final + '' + letras
				this.datos = [...this.datos, { nombre, rfc: final }]
				break
            case 2:
            letras = uuid()
			.split('-')[0]
			.slice(0, 3)
				let primera = nombre.split(' ')[0].split('')[0] // la primera letra de la primera palabra
				let segunda = nombre
					.split(' ')[1]
					.split('')
					.slice(0, 2)
					.join('') // la primera letra de la primera palabra

				final = primera + segunda

				final = final + '' + fecha
				final = final + '' + letras
				this.datos = [...this.datos, { nombre, rfc: final }]
				break
            case 3:
            letras = uuid()
			.split('-')[0]
			.slice(0, 3)
				let uno = nombre.split(' ')[0].split('')[0] // la primera letra de la primera palabra
				let dos = nombre.split(' ')[1].split('')[0] // la primera letra de la primera palabra
				let tres = nombre.split(' ')[2].split('')[0] // la primera letra de la primera palabra

				final = uno + dos + tres

				final = final + '' + fecha
				final = final + '' + letras
				this.datos = [...this.datos, { nombre, rfc: final }]
				break

            default:
            letras = uuid()
			.split('-')[0]
			.slice(0, 3)
				let uno_e = nombre.split(' ')[0].split('')[0] // la primera letra de la primera palabra
				let dos_e = nombre.split(' ')[1].split('')[0] // la primera letra de la primera palabra
				let tres_e = nombre.split(' ')[2].split('')[0] // la primera letra de la primera palabra

				final = uno_e + dos_e + tres_e

				final = final + '' + fecha
				final = final + '' + letras
				this.datos = [...this.datos, { nombre, rfc: final }]

				break
		}
	}
	traer_proveedores() {
		return new Promise((resolve, reject) => {
			db.execute('SELECT CAT from productos')
				.then(([res]) => {
					this.proveedores = [...res]

					resolve(this)
				})
				.catch((err) => reject(err))
		})
	}
	guardar_proveedores({nombre,rfc}) {
		return new Promise((resolve, reject) => {
			db.execute('INSERT INTO proveedores (id,RFC,razon_social) VALUES(?,?,?)',[uuid(),rfc,nombre])
				.then((res) => {	
                    console.log('guardar');
                    				
					resolve(res)
				})
				.catch((err) => reject(err))
		})
	}
	limpiar_proveedores() {
		this.proveedores = this.proveedores.map((e, i, arr) => e.CAT.toLowerCase())
		this.proveedores = this.proveedores.filter(
			(e, i, arr) => arr.indexOf(e) == i
		)
		console.log(this.proveedores.length)
		return this.proveedores.sort((a, b) => a - b)
	}
}

const itinerar = async () => {
	try {
		let prov = new Provedor()
		await prov.traer_proveedores()
		let proveedores_nuevo = prov.limpiar_proveedores()
		
        proveedores_nuevo.map(async (i) =>prov.generar_rfc(i))
        prov.datos.map(async (i) =>await prov.guardar_proveedores({nombre:i.nombre,rfc:i.rfc}))		
        console.log(prov.datos);        		
        	console.log('exito');
                
        
	} catch (err) {
		console.log(err)
	}
}
itinerar()
