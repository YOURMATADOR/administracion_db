const usuario = require('../models/usuario')

const getLogin =  (req,res,next)=> {
    res.render('login')
}
const getIndex =  async (req,res,next)=> {
	try{
		let usuarios = await usuario.findAll({raw:true})
		// console.log(usuarios);
		
	res.render('index',{usuarios})
	}
	catch(err){
		console.log(err);		
	}

}
const getRegistro =  (req,res,next)=> {
    res.render('registro')

}
const postRegistro = async (req,res,next)=> {
    try{
        let {direccion,telefono,cumpleaños,nombre,correo,contraseña} = req.body
        let id = uuid()
    usuario
	.sync()
	.then(async () => {
        // Table created
        try{
		await usuario
			.create({
				id,
				direccion,
				telefono,
				cumpleaños,
				rol:'vendedor',
				registro:new Date(),
				nombre,
				correo,
				contraseña,
			})			
				let usr = await usuario.findOne({ where: { id } })
					usr.encriptar_pass(contraseña)
        }
        catch(error){
            throw new Error(error)
        }
	})
	.catch((err) => console.log(err))
    
}
catch(err){
    console.log(err);
}
}

module.exports = {getIndex,getLogin,getRegistro,postRegistro}