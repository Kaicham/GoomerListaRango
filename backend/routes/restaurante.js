const rotas = require('express').Router();
const restauranteContoller = require('../controller/restaurante')
const multer = require('multer');
const uploadConfig = require('../config/upload')

//Função para inicializar o muulter com as configurações no arquivo de upload
const upload = multer(uploadConfig);


//Adicionando restaurante 
rotas.post('/adicionar', upload.single('imagem'), restauranteContoller.criarRestaurante)

//Listando restaurantes
rotas.get('/listar', restauranteContoller.listarRestaurantes)

//Listadno dados de um restaurante
rotas.get('/listar/:id', restauranteContoller.listartDadosRestaurante)

//Alterando dados de um restaurante
rotas.put('/atualizar/:id', restauranteContoller.atualizarRestautante)

//Excluindo o restaurante
rotas.delete('/excluir/:id', restauranteContoller.excluirRestaurante)

module.exports = rotas;