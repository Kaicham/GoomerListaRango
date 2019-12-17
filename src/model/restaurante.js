const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restauranteSchema = new Schema({
    nome:   {type: String, required: true},
    imagem: {type: String, required: true},
    endereco: {
        logradouro: {type: String, required: true},
        numero:     {type: Number, required: true},
        bairro:     {type: String, required: true},
        cidade:     {type: String, required: true},
        estado:     {type: String, required: true},
        complemento: String
    },
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
})

const Restaurante = mongoose.model("Restaurantes", restauranteSchema);
module.exports = Restaurante;