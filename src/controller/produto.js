const Produto = require('../model/produto');

module.exports = {

    //Função para criar um produto
    async criarProduto(req, res){
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }
        
        const { filename } = req.file;

        let {restauranteID, nome, preco, categoria, promocao, descricao, precoPromocional} = req.body;
        let imagem = filename;
    
        const novoProduto = new Produto({
            restauranteID,
            nome,
            imagem,
            preco,
            categoria,
            promocao,
            infoPromocao: { 
                descricao,
                precoPromocional    
            }
        })
    
        await novoProduto.save()
        .then( produto => {
            retorno.mensagem = 'Produto criado com sucesso!'
            retorno.data = produto 
            return res.status(200).json(retorno)
        })
        .catch(err => { 
            console.log('Erro ao criar produto: ' + err)
            retorno.erro = 'erro ao criar produto'
            return res.status(500).json(retorno)
        })    
    },


    //Função para listar produtos de um restaurante
    async listarProdutos(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        let restauranteID = req.params.restauranteID;

        await Produto.find({restauranteID})
        .then( produtos => res.status(200).json({total: produtos.length, produtos}))
        .catch( err => {
            console.log('Erro ao listar os produtos: ' + err)
            erro.mensagem = 'erro ao listar os produtos do restaurante' 
            return res.status(500).json(retorno) 
        })
    },

    //Função para atualizar produto
    async atualizarProduto(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        let produtoID = req.params.id;
        await Produto.findById(produtoID) 
        .then(produto => {
    
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.categoria = req.body.categoria;
            produto.promocao = req.body.promocao;
            produto.infoPromocao = req.body.infoPromocao;
            produto.updated = Date.now();
    
            produto.save()
            .then( produto => {
                retorno.mensagem = 'Produto atualizado com sucesso!'
                retorno.data = produto
                return res.status(200).json(retorno)
            })
            .catch(err => {
                console.log('Erro ao alterar o produto: ' + err) 
                retorno.erro = 'erro ao alterar o produto'
                return res.status(500).json(retorno)
            })
    
        })
        .catch(err => {
            console.log('Erro ao alterar buscar o produto: ' + err) 
            retorno.erro = 'erro ao alterar buscar o produto'
            return res.status(500).json(retorno)
        })
    
    },
    
    //Função para atualizar a imagem de um produto
    async atualizarImagemProduto(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }

        const { filename } = req.file;        
        let produtoID = req.params.id;

        await Produto.findById(produtoID)
        .then( produto => {

            produto.imagem = filename;
            produto.save()
            .then( produto => {
                retorno.mensagem = 'Produto atualizado com sucesso!'
                retorno.data = produto
                return res.status(200).json(retorno)
            })
            .catch(err => {
                console.log('Erro ao alterar o produto: ' + err) 
                retorno.erro = 'erro ao alterar o produto'
                return res.status(500).json(retorno)
            })

        })
        .catch(err => {
            console.log('Erro ao alterar buscar o produto: ' + err) 
            retorno.erro = 'erro ao alterar buscar o produto'
            return res.status(500).json(retorno)
        })

    },

    //Função para excluir um produto
    async excluirProduto(req, res) {
        //Variável de retorno
        let retorno = {
            mensagem: '',
            erro: '',
            data: {}
        }
        
        let produtoID = req.params.id;
        await Produto.findByIdAndDelete(produtoID)
        .then( () => { 
            retorno.mensagem = 'Produto deletado com sucesso!'
            return res.status(200).json(retorno)
        })
        .catch(err => {
            console.log('Erro ao excluir o produto: ' + err)
            retorno.erro = 'erro ao excluir o produto'
            return res.status(500).json(retorno)
        })
    
    }

}