const db = require('../utils/database')
const uuid = require('uuid/v1')
class Factura {
    constructor(){
        this.metodo =['efectivo','targeta','credito','cupon']
        this.compras = []
    }
    _traer_productos(){
        return new Promise((resolve, reject) => {
        db.execute('SELECT * from productos')
        .then(([result]) => {
            this.productos = result
            resolve(result)
        })
        .catch((err) => {
            reject(err)
        })    
        })
    }
    _traer_lotes(){
        return new Promise((resolve, reject) => {
        db.execute('SELECT * from lotes')
        .then(([result]) => {
            this.lotes = result
            resolve(result)
        })
        .catch((err) => {
            reject(err)
        })    
        })
    }
    _traer_usuarios(){
        return new Promise((resolve, reject) => {
        db.execute('SELECT * from usuarios')
        .then(([result]) => {
            this.usuarios = result
            this.usuarios_vendedores = this.usuarios.filter(i => i.rol =='vendedor')
            this.usuarios_compradores = this.usuarios.filter(i => i.rol =='comprador')
            resolve(result)
        })
        .catch((err) => {
            reject(err)
        })    
        })
    }
    _random_cant(){
        return Math.floor(Math.random() * 5)+1
    }
    _random_prod(){
        return Math.floor(Math.random() * this.productos.length)
    }
    _random_usuario_comprador(){
        return Math.floor(Math.random() * this.usuarios_compradores.length)
    }
    _random_metodo(){
        return Math.floor(Math.random() * this.metodo.length)
    }
    _random_usuario_vendedor(){
        return Math.floor(Math.random() * this.usuarios_vendedores.length)
    }

    _fecha_random(start = new Date(1990, 0, 1), end = new Date(2019, 0, 1)) {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		)
    }
    
    crear_facturas(){
        return new Promise(async (resolve,reject)=> {
            let  i=this._random_cant()
            
            this.total_factura =0;
            this.ui_factura = uuid()
            this.usuario_vendedor = this.usuarios_vendedores[this._random_usuario_vendedor()]
            this.usuario_comprador = this.usuarios_vendedores[this._random_usuario_comprador()]
            this.metodo_factura = this.metodo[this._random_metodo()]
            for(let x = 0;x< i;x++){
                this.compras = [...this.compras,this.productos[this._random_prod()]]
            }
            console.log('this.compras',this.compras);
            
            this.compras.map(async item=> {            
                try {
                    let lote_f  = this.lotes.find(item_lote => item_lote.id_producto == item.id)
                    
                    await db.execute(
                        `INSERT INTO productoXfactura (numero,id_factura,cantidad,precio,lote) VALUES (?,?,?,?,?)`,
                        [uuid(), this.ui_factura, this._random_cant(), lote_f.precio.toFixed(2), lote_f.id]
                        )
                        this.total_factura +=lote_f.precio;
                        console.log(lote_f,'precio',lote_f.precio,this.total_factura);
                        resolve(this)
                } catch (error) {
                    reject(error)
                }
            })          
        })
    }
    insertar_factura(){
        return new Promise(async (resolve,reject)=> {
            try{
                let subtotal_factura =this.total_factura - this.total_factura * .16;
                console.log('total',this.total_factura);
                
            await db.execute(
                `INSERT INTO facturas (numero,fecha,id_cliente,id_vendedor,subtotal,iva,total,metodo_pago) VALUES (?,?,?,?,?,?,?,?)`,
                [this.ui_factura, this._fecha_random(), this.usuario_comprador.id, this.usuario_vendedor.id, subtotal_factura.toFixed(2),(+this.total_factura* .16).toFixed(2) , this.total_factura.toFixed(2),this.metodo_factura]
                )
                resolve(this)
        }
            catch(err){
                reject(err)
            }
        })
    }
}
const itinerar =async () => {
    let factura_nueva = new Factura()
    try {        
        console.log('exito');
     
        await factura_nueva._traer_lotes()
        await factura_nueva._traer_productos()
        await factura_nueva._traer_usuarios()
    for (let index = 0; index < 100; index++) {
        await factura_nueva.crear_facturas()
        await factura_nueva.insertar_factura()
                
    }
     console.log('EXITO AL LLENAR LAS TABLAS');
       
    } catch (error) {
        console.log(error);        
    }

}
itinerar()