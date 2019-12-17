const rotas = require('express').Router();
const produtoContoller = require('../controller/produto')
const multer = require('multer');
const uploadConfig = require('../config/upload')

//Função para inicializar o muulter com as configurações no arquivo de upload
const upload = multer(uploadConfig);


//Adicionando produto 
rotas.post('/adicionar', upload.single('imagem'), produtoContoller.criarProduto)

//Listando produtos
rotas.get('/listar/:restauranteID', produtoContoller.listarProdutos)

//Alterando dados de um produto
rotas.put('/atualizar/:id', produtoContoller.atualizarProduto)

//Excluindo o produto
rotas.delete('/excluir/:id', produtoContoller.excluirProduto)

module.exports = rotas;