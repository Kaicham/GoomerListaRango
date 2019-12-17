const Produto = require('../model/produto');

module.exports = {

    //Função para criar um produto
    async criarProduto(req, res){

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
        .then( () => res.status(200).json('Produto criado com sucesso!'))
        .catch(err => res.status(500).json('Error: ' + err))    
    },


    //Função para listar produtos de um restaurante
    async listarProdutos(req, res) {
        let restauranteID = req.params.restauranteID;

        await Produto.find({restauranteID})
        .then( produtos => res.status(200).json({total: produtos.length, produtos}))
        .catch( err => res.status(500).json("Error : " + err) )
    },

    //Função para aualizar restaurante
    async atualizarProduto(req, res) {

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
            .then( () => res.status(200).json('Produto atualizado com sucesso!'))
            .catch(err => res.status(500).json('Error: '+ err))
    
        })
        .catch(err => res.status(500).json('Error: '+ err))
    
    },
    
    //Função para atualizar a imagem de um produto
    async atualizarImagemProduto(req, res) {

        const { filename } = req.file;        
        let produtoID = req.params.id;

        await Produto.findById(produtoID)
        .then( produto => {

            produto.imagem = filename;
            produto.save()
            .then( () => res.status(200).json('Produto atualizado com sucesso!'))
            .catch(err => res.status(500).json('Error: '+ err))

        })
        .catch(err => res.status(500).json('Error: '+ err))

    },

    //Função para excluir um produto
    async excluirProduto(req, res) {

        let produtoID = req.params.id;
        await Produto.findByIdAndDelete(produtoID)
        .then( () => res.status(200).json('Produto deletado com sucesso!'))
        .catch(err => res.status(500).json('Error: '+ err))
    
    }

}