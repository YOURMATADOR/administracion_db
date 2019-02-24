const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;
const index_router = require('./routes/index')
const login_router = require('./routes/login')
const registro_router = require('./routes/registro')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')))

app.use(index_router)
app.use(login_router)
app.use(registro_router)

app.listen(PORT,()=> console.log('escuchando desde el puerto ',PORT,`ingresa con http://localhost:${PORT}`))