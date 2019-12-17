const Restaurante = require('../model/restaurante');

module.exports = {

    //Função para criar restaurante
    async criarRestaurante(req, res){

        const { filename } = req.file;

        let nome = req.body.nome;
        let imagem = filename;
        let {logradouro, numero, bairro, cidade, estado, complemento} = req.body;
    
        const novoRestautante = new Restaurante({
            nome,
            imagem,
            endereco: {
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                complemento
            }
        })
    
        await novoRestautante.save()
        .then( () => res.status(200).json('Restaurante criado com sucesso!'))
        .catch(err => res.status(500).json('Error: ' + err))    
    },


    //Função para listar restaurantes
    async listarRestaurantes(req, res) {
        await Restaurante.find({})
        .then( restaurantes => res.status(200).json({total: restaurantes.length, restaurantes}))
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
            restaurante.endereco = req.body.endereco;
            restaurante.updated = Date.now();
    
            restaurante.save()
            .then( () => res.status(200).json('Restaurante atualizado com sucesso!'))
            .catch(err => res.status(500).json('Error: '+ err))
    
        })
        .catch(err => res.status(500).json('Error: '+ err))
    
    },

    //Função para atualizar a imagem de um restaurante
    async atualizarImagemRestaurante(req, res) {

        const { filename } = req.file;        
        let restauranteID = req.params.id;

        await Restaurante.findById(restauranteID)
        .then( restaurante => {

            restaurante.imagem = filename;
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