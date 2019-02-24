const usuario = require('../models/usuario')

const getLogin = (req, res, next) => {
	res.render('login')
}
const postLogin = async (req, res, next) => {
	try {
		let { correo, contraseña } = req.body
		await usuario.sync()
        let usr = await usuario.findOne({ where: { correo } })
        console.log(usr);
        
		if (!!usr) {
			await usr.comprobar_pass(contraseña)
			res.redirect('/home')
		} else {
			res.redirect('/')
		}
	} catch (err) {
		console.log(err)
		res.redirect('/')
	}
}

module.exports = { getLogin, postLogin }
