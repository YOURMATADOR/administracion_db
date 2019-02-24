const Sequelize = require('sequelize')
const sequelize = require('../utils/db').sequelize
const bc = require('bcrypt')

const usuario = sequelize.define(
	'usuario',
	{
		id: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		direccion: {
			type: Sequelize.STRING
		},
		telefono: {
			type: Sequelize.STRING
		},
		cumpleaños: {
			type: Sequelize.STRING
		},
		rol: {
			type: Sequelize.STRING
		},
		registro: {
			type: Sequelize.STRING
		},
		nombre: {
			type: Sequelize.STRING
		},
		correo: {
			type: Sequelize.STRING,
			unique: true
		},
		contraseña: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)

usuario.prototype.encriptar_pass = function() {
	console.log('modificado')
	bc.genSalt(10, (err, salt) => {
		bc.hash(this.contraseña, salt, (err, hash) => {
			if (err) {
				console.log({
					err,
					mensaje: 'Error al encriptar la contraseña'
				})
			} else {
				console.log(hash)
				this.contraseña = hash
				this.save()
			}
		})
	})
}
usuario.prototype.comprobar_pass = async function(pass) {
	try {				
			let comparacion = await bc.compare(pass, this.contraseña)

			if (!!comparacion) {
				return Promise.resolve(this)
			} else {
				return Promise.reject(new Error('Las contraseñas no coinciden'))
			}
		
	} catch (err) {
		return Promise.reject({
			err,
			mensaje: 'Contraseña invalida'
		})
	}
}
module.exports = usuario
