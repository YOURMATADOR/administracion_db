var api_key = 'SEM37545F227D6F005BF7728CC1B24C4F4F1'
var api_secret = 'NTRmYjI5ODllMzI4ODcyNmNhYjA2ZGFiNjRmMTM3MWQ'
var sem3 = require('semantics3-node')(api_key, api_secret)
const db = require('../utils/database')
const uuid = require('uuid/v1')
const request = require('superagent')

// Run the request

class Producto {
	constructor(nombre) {
		sem3.products.products_field('search', nombre)
		this.nombre = nombre
		this.descripcion = ''
		this.precio = ''
		this.cantidad = ''
		this.cat = ''
	}
	crear(indice) {
		console.log('nombre', this.nombre)

		return new Promise((resolve, reject) =>
			sem3.products.get_products((err, products) => {
				if (err) {
					reject(err)
				}
				products = JSON.parse(products)
				let resultado = products.results[indice]

				let { name, price, price_currency, brand } = resultado
				this.descripcion = name
				this.precio = `${price} ${price_currency}`
				this.cantidad = Math.floor(Math.random() * 100)
				this.cat = brand				
				resolve(this)
			})
		)
	}
	guardar() {
		console.log(this)
		db.execute(
			`INSERT INTO productos (id,descripcion,precio_venta,cant_inventario,CAT) VALUES (?,?,?,?,?)`,
			[uuid(), this.descripcion, this.precio, this.cantidad, this.cat]
		)
			.then((res) => Promise.resolve('Campos creados', res))
			.catch((err) => console.log(err))
		return Promise.resolve(this)
	}
}

const itinerar = async (nombre) => {
	for (let i = 0; i < 10; i++) {
		try {
			console.log(`=>>% ${Math.floor((i / 5) * 100)}`)
			let producto = new Producto(nombre)
			await producto.crear(i)
			await producto.guardar()
		} catch (err) {
			console.log(err)
		}
	}
	return Promise.resolve('Finalizado')
}
module.exports = { Producto, itinerar }
