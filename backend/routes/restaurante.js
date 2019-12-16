const rotas = require('express').Router();
const restauranteContoller = require('../controller/restaurante')


//Adicionando restaurante 
rotas.route('/adicionar').post(restauranteContoller.criarRestaurante)

//Listando restaurantes
rotas.route('/listar').get(restauranteContoller.listarRestaurantes)

//Listadno dados de um restaurante
rotas.route('/listar/:id').get(restauranteContoller.listartDadosRestaurante)

//Alterando dados de um restaurante
rotas.route('/atualizar/:id').put(restauranteContoller.atualizarRestautante)

//Excluindo o restaurante
rotas.route('/excluir/:id').delete(restauranteContoller.excluirRestaurante)

module.exports = rotas;