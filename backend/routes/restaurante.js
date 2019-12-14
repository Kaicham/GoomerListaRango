const rotas = require('express').Router();
const Restaurante = require('../model/restaurante');

//TODO: Refatorar e adicionar controllers
//Adicionando restaurante 
rotas.route('/adicionar').post((req, res) => {

    //TODO: fazer o tratamento de salvar imagem e servidor de imagem
    let nome = req.body.nome;
    let imagem = req.body.imagem;
    let endereco = req.body.endereco;

    const novoRestautante = new Restaurante({
        nome,
        imagem,
        endereco
    })

    novoRestautante.save()
    .then( () => res.status(200).json('Restaurante criado com sucesso!'))
    .catch(err => res.status(500).json('Error: '     + err))    
})

//Listando restaurantes
rotas.route('/listar').get((req, res) => {

    Restaurante.find({})
    .then( restaurantes => res.status(200).json(restaurantes))
    .catch( err => res.status(500).json("Error : " + err) )

})

//Listadno dados de um restaurante
rotas.route('/listar/:id').get((req, res) => {

    let restauranteID = req.params.id;
    Restaurante.findById(restauranteID)
    .then(restaurante => res.status(200).json(restaurante))
    .catch(err => res.status(500).json('Error: Parâmetros inválidos!'))

})

//Alterando dados de um restaurante
rotas.route('/atualizar/:id').put((req, res) => {

    let restauranteID = req.params.id;
    Restaurante.findById(restauranteID) 
    .then(restaurante => {

        restaurante.nome = req.body.nome;
        restaurante.imagem = req.body.imagem;
        restaurante.endereco = req.body.endereco;
        restaurante.updated = Date.now();

        restaurante.save()
        .then( () => res.status(200).json('Restaurante atualizado com sucesso!'))
        .catch(err => res.status(500).json('Error: '+ err))

    })
    .catch(err => res.status(500).json('Error: '+ err))

})

//Excluindo o restaurante
rotas.route('/excluir/:id').delete((req, res) => {

    let restauranteID = req.params.id;
    Restaurante.findByIdAndDelete(restauranteID)
    .then( () => res.status(200).json('Restaurante deletado com sucesso!'))
    .catch(err => res.status(500).json('Error: '+ err))

})

module.exports = rotas;