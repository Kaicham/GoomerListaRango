const express =  require('express');
const server = express();

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


server.get('/', (req, res) => {
    console.log("Desafio iniciado!")
    res.send("Desafio iniciado!")
})

server.listen(port, () => {
    console.log("Server iniciado no port: ", port)
})