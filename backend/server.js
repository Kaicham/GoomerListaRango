const express =  require('express');
const server = express();

const port = 8000

server.get('/', (req, res) => {
    console.log("Desafio iniciado!")
    res.send("Desafio iniciado!")
})

server.listen(port, () => {
    console.log("Server iniciado no port: ", port)
})