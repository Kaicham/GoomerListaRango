const Restaurante = require('../model/restaurante');

module.exports = {

    //Função para criar restaurante
    async criarRestaurante(req, res){

        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

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
        .then( restaurante =>  {
            retorno.mensagem = 'Restaurante criado com sucesso!'
            retorno.data = restaurante
            return res.status(200).json(retorno)
        })
        .catch(err => {
            console.log('Erro ao salvar o resturante: ' + err)
            retorno.erro = 'erro ao criar o restaurante' 
            return res.status(500).json(retorno)
        })    
    },


    //Função para listar restaurantes
    async listarRestaurantes(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        await Restaurante.find({})
        .then( restaurantes => res.status(200).json({total: restaurantes.length, restaurantes}))
        .catch( err => { 
            console.log('Erro ao listar restaurantes: ' + err)
            retorno.erro = 'erro ao listar restaurantes'
            return res.status(500).json(retorno) 
        })
    },

    //Função para listar dados de um restaurante
    async listartDadosRestaurante(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        let restauranteID = req.params.id;
        await Restaurante.findById(restauranteID)
        .then(restaurante => res.status(200).json(restaurante))
        .catch(err => { 
            console.log('Erro ao listar restaurante: ' + err)
            retorno.erro = 'erro ao listar restaurante'
            return res.status(500).json(retorno) 
        })
    
    },

    //Função para aualizar restaurante
    async atualizarRestautante(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        let restauranteID = req.params.id;
        await Restaurante.findById(restauranteID) 
        .then(restaurante => {
    
            restaurante.nome = req.body.nome;
            restaurante.endereco = req.body.endereco;
            restaurante.updated = Date.now();
    
            restaurante.save()
            .then( restaurante => {
                retorno.mensagem = 'Restaurante atualizado com sucesso!'
                retorno.data = restaurante 
                return res.status(200).json(retorno)
            })
            .catch(err => {
                console.log('Erro ao atualizar restaurante: ' + err)
                retorno.erro = 'erro ao atualizar restaurante' 
                return res.status(500).json(retorno)
            })
    
        })
        .catch(err => {
            console.log('Erro ao buscar restaurante: ' + err)
            retorno.erro = 'erro ao buscar restaurante' 
            return res.status(500).json(retorno)
        })
    
    },

    //Função para atualizar a imagem de um restaurante
    async atualizarImagemRestaurante(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        const { filename } = req.file;        
        let restauranteID = req.params.id;

        await Restaurante.findById(restauranteID)
        .then( restaurante => {

            restaurante.imagem = filename;
            restaurante.save()
            .then( restaurante => { 
                retorno.mensagem = 'Restaurante atualizado com sucesso!'
                retorno.data = restaurante
                return res.status(200).json(retorno)
            })
            .catch(err => {
                console.log('Erro ao atualizar restaurante: '+ err)
                retorno.erro = 'erro ao atualizar restaurante'
                return res.status(500).json(retorno)    
            })

        })
        .catch(err => {
            console.log('Erro ao buscar restaurante: ' + err)
            retorno.err = 'erro ao buscar restaurante' 
            return res.status(500).json(retorno)
        })

    },

    //Função para excluir um restaurante
    async excluirRestaurante(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }
        
        let restauranteID = req.params.id;
        await Restaurante.findByIdAndDelete(restauranteID)
        .then( () => { 
            retorno.mensagem = 'Restaurante deletado com sucesso!'
            return res.status(200).json(retorno)
        })
        .catch(err => {
            console.log('Erro ao excluir o restaurante: ' + err)
            retorno.erro = 'erro ao excluir o restaurante'
            return res.status(500).json(retorno)
        })
    
    }

}