const db = require('../utils/database')
const uuid = require('uuid/v1')
const request = require('superagent')

// $.ajax({
//     url: 'https://randomuser.me/api/',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });
let roles = ['admin', 'comprador', 'vendedor']

class Usuario {
	constructor() {
		this.nombre = ''
		this.direccion = ''
		this.telefono = ''
		this.contraseña = ''
		this.cumpleaños = ''
		this.rol = ''
		this.registro = ''
		this.correo = ''
	}
	generar() {
		return request
			.get('https://randomuser.me/api/') // sends a JSON post body
			.set('accept', 'json')
			.then((res) => {
				
				let resultado = res.body.results[0]
				let { first, last } = resultado.name
				let { street, city, state, postcode } = resultado.location
				let { email } = resultado
				let { phone } = resultado
				let { password } = resultado.login
				let { date } = resultado.dob
				let { date: fechaRegistro } = resultado.registered

				this.nombre = `${first} ${last}`
				this.direccion = `calle:${street} ciudad:${city} estado:${state} C.P:${postcode}`
				this.correo = email
				this.telefono = phone
				this.contraseña = password
				this.cumpleaños = date
				this.registro = fechaRegistro
				this.rol = roles[Math.floor(Math.random() * 3)]

				return Promise.resolve(this)
			})
			.catch((err) => Promise.reject(err))
	}
	guardar() {
		
		db.execute(
			`INSERT INTO usuarios (id,nombre,direccion,correo,telefono,contraseña,cumpleaños,registro,rol) VALUES (?,?,?,?,?,?,?,?,?)`,
			[
				uuid(),
				this.nombre,
				this.direccion,
				this.correo,
				this.telefono,
				this.contraseña,
				this.cumpleaños,
				this.registro,
				this.rol
			]
		)
        .then((res) => Promise.resolve('Campos creados', res))
        .catch((err) => Promise.reject(err))
        return Promise.resolve(this)
    }
   
}
const itinerar = async (numero) => {
    for(let i = 0; i<=numero;i++){
        try{
            console.log(`=>>% ${Math.floor((i/numero*100))}`);
            
        let usuario = new Usuario()
        await usuario.generar()
        await usuario.guardar()
        }
        catch(err){
            console.log(err);
            
        }
    }
    return Promise.resolve('Finalizado')
}
module.exports = {Usuario,itinerar}
