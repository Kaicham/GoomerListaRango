const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    restauranteID:  {type: mongoose.Schema.Types.ObjectId, required: true},
    nome:           {type: String, required: true},
    imagem:         {type: String, required: true},
    preco:          {type: Number, required: true},
    categoria:      {type: String, required: true},
    promocao:       {type: Boolean, default: false},
    infoPromocao: {
        descricao: String,
        precoPromocional: Number
    },
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

const Produto = mongoose.model("Produtos", produtoSchema);
module.exports = Produto;