const express =  require('express');
const path = require('path');
const server = express();

//Rotas 
const restauranteRoutes = require('./routes/restaurante')

const port = 8000

//TODO: Connectando ao banco de dados - refatorar e separar. Utilizar função assincrona
const mongoose = require('mongoose')
const dataBaseURI = "mongodb+srv://admin:admin@cluster0-k77ap.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(error){
        console.log(error)
        
    }
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB conectado com sucesso!')
})

//TODO: Connectando ao banco de dados - refatorar e separar. Utilizar função assincrona

server.use(express.json())

//Rostar dos restaurantes
server.use('/restaurante', restauranteRoutes)


//Servidor de arquivos estáticos
server.use('/arquivos', express.static(path.resolve(__dirname, 'uploads')))

server.listen(port, () => {
    console.log("Server iniciado no port: ", port)
})