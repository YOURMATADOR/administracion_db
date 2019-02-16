const db = require('../utils/database')


class Lote {
	constructor() {
		this.fecha_compra = ''
		this.fecha_caducidad = ''
		this.id_producto = ''
		this.id_proveedor = ''
		this.unidades = ''
		this.precio = ''
	}
	_traer_proveedores() {
		return new Promise((resolve, reject) => {
			db.execute('SELECT * from proveedores')
				.then(([result]) => {
					this.proveedores = result
					resolve(this)
				})
				.catch((err) => {
					reject(err)
				})
		})
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
    actualizar_productos(){
        this.productos.map(async i=> {            
            try{
                console.log('up',i);
            let nuevo = i.CAT.toLowerCase()
            await db.execute(`UPDATE productos SET CAT='${nuevo}' WHERE id='${i.id}'`)
            }
            catch(err){
                console.log(err);                
            }
        })
    }
    _fecha_random(start = new Date(1990, 0, 1), end = new Date(2019, 0, 1)) {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		)
	}
    crear_lotes(){
        this.productos.map(async (i,inx)=> {            
            try{
                let proveedor = this.proveedores.find(e => e.razon_social == i.CAT );
                let f_compra = this._fecha_random()
                let f_caducidad = this._fecha_random(new Date(2020, 0, 1),new Date(2050, 0, 1))
                console.log('proveedor',proveedor,i,i.id);
            let nuevo = i.CAT.toLowerCase()
            await db.execute('INSERT INTO lotes (id,fecha_compra,fecha_caducidad,id_producto,id_proveedor,unidades,precio) VALUES(?,?,?,?,?,?,?)',
            [inx,f_compra,f_caducidad,i.id,proveedor.id,i.cant_inventario,i.precio_venta])
            }
            catch(err){
                console.log(err);                
            }
        })
    }
    
}

let llamar  =async() => {
    try {
        let nuevo_lote = new Lote()
        let prov =await nuevo_lote._traer_proveedores()
        let prod =await nuevo_lote._traer_productos()
        await nuevo_lote.crear_lotes()
        console.log(prod);
        
        
    } catch (error) {
        console.log(error);
        
    }
    
}
llamar()

