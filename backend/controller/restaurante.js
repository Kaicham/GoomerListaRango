const Restaurante = require('../model/restaurante');

module.exports = {

    //Função para criar restaurante
    async criarRestaurante(req, res){

        //TODO: fazer o tratamento de salvar imagem e servidor de imagem
        let nome = req.body.nome;
        let imagem = req.body.imagem;
        let endereco = req.body.endereco;
    
        const novoRestautante = new Restaurante({
            nome,
            imagem,
            endereco
        })
    
        await novoRestautante.save()
        .then( () => res.status(200).json('Restaurante criado com sucesso!'))
        .catch(err => res.status(500).json('Error: '     + err))    
    },


    //Função para listar restaurantes
    async listarRestaurantes(req, res) {

        await Restaurante.find({})
        .then( restaurantes => res.status(200).json({total: restaurantes.length, restaurantes: restaurantes}))
        .catch( err => res.status(500).json("Error : " + err) )
    },

    //Função para listar dados de um restaurante
    async listartDadosRestaurante(req, res) {

        let restauranteID = req.params.id;
        await Restaurante.findById(restauranteID)
        .then(restaurante => res.status(200).json(restaurante))
        .catch(err => res.status(500).json('Error: Parâmetros inválidos!'))
    
    },

    //Função para aualizar restaurante
    async atualizarRestautante(req, res) {

        let restauranteID = req.params.id;
        await Restaurante.findById(restauranteID) 
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
    
    },

    //Função para excluir um restaurante
    async excluirRestaurante(req, res) {

        let restauranteID = req.params.id;
        await Restaurante.findByIdAndDelete(restauranteID)
        .then( () => res.status(200).json('Restaurante deletado com sucesso!'))
        .catch(err => res.status(500).json('Error: '+ err))
    
    }

}