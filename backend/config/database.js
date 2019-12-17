const mongoose = require('mongoose')
//String de conexão com o banco
const dataBaseURI = "mongodb+srv://admin:admin@cluster0-k77ap.mongodb.net/test?retryWrites=true&w=majority"

module.exports = {

    //Função responsável para fazer conexão com o banco de dados
    connect() {

        mongoose.connect(dataBaseURI, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
            if(error){
                console.log(error)
                process.exit(1)
            }
        })
        
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB conectado com sucesso!')
        })

    }

}


