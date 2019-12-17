const express =  require('express');
const path = require('path');
const database = require('./config/database');
const server = express();

//Rotas 
const restauranteRoutes = require('./routes/restaurante')
const produtosRoutes = require('./routes/produto')

//Porta de saida do servidor
const port = 8000

//Connecetando ao banco de dados
database.connect()

//Habilitando o uso de json como resposta no servidor
server.use(express.json())

//Rotas dos restaurantes
server.use('/restaurantes', restauranteRoutes)

//Rotas dos produtos
server.use('/produtos', produtosRoutes)

//Servidor de arquivos estáticos
server.use('/arquivos', express.static(path.resolve(__dirname, 'uploads')))

server.listen(port, () => {
    console.log("Server iniciado no port: ", port)
})