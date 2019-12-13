const express =  require('express');
const server = express();

const Restaurante = require('./model/restaurante');
const Produto = require('./model/produto');

const port = 8000

//Connectando ao banco de dados - refatorar e separar. Utilizar função assincrona
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

//Connectando ao banco de dados - refatorar e separar. Utilizar função assincrona

server.use(express.json())


server.listen(port, () => {
    console.log("Server iniciado no port: ", port)
})