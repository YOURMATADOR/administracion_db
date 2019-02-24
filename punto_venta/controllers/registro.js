const uuid = require('uuid/v1')

const usuario = require('../models/usuario')

const getRegistro = (req, res, next) => {
	res.render('registro')
}
const postRegistro = async (req, res, next) => {
	try {
		let {
			direccion,
			telefono,
			cumpleaños,
			nombre,
			correo,
			contraseña
		} = req.body
		let id = uuid()
		console.log('id ',id);
		
		usuario.sync().then(async () => {
			try {
				await usuario.create({
					id,
					direccion,
					telefono,
					cumpleaños,
					rol: 'vendedor',
					registro: new Date().toString(),
					nombre,
					correo,
					contraseña
				})
				console.log('id ',id);
				let usr = await usuario.findOne({ where: { correo } })
				usr.encriptar_pass(contraseña)
				res.redirect('/')
			} catch (error) {
				throw new Error(error)
			}
		})
	} catch (err) {
		console.log(err)
	}
}

module.exports = { getRegistro, postRegistro }
