![alt text](https://github.com/goomerdev/job-dev-backend-interview/raw/master/media/logo-azul.png "Goomer")

# Goomer Lista Rango


Api construída em `NodeJS` para o controle de restaurantes e seus produtos.



## Instalação

Para rodar a aplicação é necessário ter instalado uma vesão de `Node JS` superior a 10.16.3. 

Para o desenvolvimento do projeto foi utilizado a versão **10.16.3**.


  ```bash
  git clone https://github.com/Kaicham/GoomerListaRango.git

  cd GoomerListaRango

  npm install 
  ```

## Rodando a aplicação

  ```
  npm start
  ```

## Bibliotecas externas
Para a criação da API foram utilizadas algumas bibliotecas extenas:

* [Express](https://expressjs.com/pt-br/).
* [multer](https://github.com/expressjs/multer).
* [path](https://nodejs.org/api/path.html).
* [mongoose](https://mongoosejs.com/).

# API Overview
# Restaurantes
## Cadastro de restaurantes
Utiliza-se o método `POST` no endpoint `/restaurantes/adicionar` com o `content-type multipart/form-data`.

## Parâmetros

| parâmetro            |tipo        | descrição                 |
|:----------------------|:-------|:----------------------------|
| `nome`                |string       |Nome do restaurante `[OBRIGATÓRIO]` |
| `imagem`              |file           | Arquivo de imagem`[OBRIGATÓRIO]`|
| `logradouro`          |string           | Rua do restaurante `[OBRIGATÓRIO]` |
| `numero`              |number      | Numero do restaurante `[OBRIGATÓRIO]` |
| `bairro`              |string       | Bairro do restaurante `[OBRIGATÓRIO]` |
| `cidade`              |string       | Cidade do restaurante`[OBRIGATÓRIO]` |
| `estado`              |string       | Estado do restaurante `[OBRIGATÓRIO]` |
| `complemento`         |string            | Complemento do restaurante `OPCIONAL` |


  
`POST /restaurantes/adicionar`

    http://{api_host}/restaurantes/adicionar

### Resposta

  ```json
  {
    "mensagem": "Restaurante cadastrado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


| variável     | tipo               | descrição                 |
|:-------------|:---------------|:----------------------------|
| `mensagem`    |string                   | Retorna a mensagem de sucesso do servidor|
| `error`    |string                   | Retorna a mensagem de erro caso de algum erro|
| `data`    |Object                   | Retorna os dados do restaurante cadastrado|



### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": {}
  }
  ```

## Listagem de resturantes

Utiliza-se o método `GET` no endpoint `/restaurantes/listar` para se obter uma listagem completa de todos os restaurantes cadastrados no sistema. 
  
`GET /restaurantes/listar`

    http://{api_host}/restaurantes/listar

### Resposta

  ```json
  {
    "total":12,
    "restaurantes":[{}]
  }
  ```

| variável     | tipo               | descrição                 |
|:-------------|:---------------|:----------------------------|
| `total`    |int                   | Retorna a quantidade de restaurantes cadastrados no sistema|
| `restaurantes`    |Array                   | Retorna todos os restaurantes listados|


### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": {}
  }
  ```

## Listando dados de um resturante

Utiliza-se o método `GET` no endpoint `/restaurantes/listar/{id}` passando como parâmento o `id` do restaurante.
  
## Parâmetros

| variável     | tipo               | descrição                 |
|:-------------|:---------------|:----------------------------|
| `id`    |string                   | Object Id do restaurante desejado|

`GET /restaurantes/listar/{id}`

    http://{api_host}/restaurantes/listar/1234567

### Resposta
Retorna o modelo de dados de um restaurante. Ver a sessão `Modelos`.

### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": {}
  }
  ```

## Atualizando dados de um restaurante

Utiliza-se o método `PUT` no endpoint `/restaurantes/atualizar/{id}` passando como parâmetro o `id` do resturante a ser editado. 

## Parâmetros
 Os parâmetros para a a alteração de dados são passados via `json` no body da requisição.

```json
{
    "nome": string,
    "endereco": {
        "logradouro": string,
        "numero": int,
        "bairro": string,
        "cidade": string,
        "estado":string,
        "complemento":string
    }
}
```
  
`PUT /restaurantes/atualizar/{id}`


### Resposta

  ```json
  {
    "mensagem": "Restaurante atualizado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "success": false,
    "error": "mensagem de erro",
    "data": null
  }
  ```

## Atualizando imagem de um restaurante

Utiliza-se o método `PUT` no endpoint `/restaurantes/atualizar-imagem/{id}` com o `content-type multipart/form-data` passando no campo `imagem` o arquivo a ser alterado.
  
`PUT /restaurantes/atualizar/{id}`


### Resposta

  ```json
  {
    "mensagem": "Restaurante atualizado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": null
  }
  ```

## Excluindo um restaurante

Utiliza-se o método `DELETE` no endpoint `/restaurantes/excluir/{id}` passando como parâmetro o `id` do restaurante a ser excluido.
  
`DELETE /restaurantes/excluir/{id}`


### Resposta

  ```json
  {
    "mensagem": "Restaurante excluido com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "success": false,
    "error": "mensagem de erro",
    "data": null
  }
  ````
---

# Produtos

## Cadastro de produtos
Utiliza-se o método `POST` no endpoint `/produtos/adicionar` com o `content-type multipart/form-data`.

## Parâmetros

| parâmetro            |tipo        | descrição                 |
|:----------------------|:-------|:----------------------------|
| `restauranteID`                |string       |Object ID do restaurante (utilizado como chave entre as collections) `[OBRIGATÓRIO]` |
| `nome`                |string       |Nome do produto `[OBRIGATÓRIO]` |
| `imagem`              |file           | Arquivo de imagem do produto`[OBRIGATÓRIO]`|
| `preco`          |double           | Preco do produto `[OBRIGATÓRIO]` |
| `categoria`              |string      | Categoria do produto `[OBRIGATÓRIO]` |
| `promocao`              |bool       | Campo para verificar se produto está ou não em promoção `OPCIONAL` |
| `descricao`              |string       | Descrição da promoção produto `OPCIONAL` |
| `precoPromocional`              |double       | Preço promocional do produto `OPCIONAL` |



  
`POST /produtos/adicionar`

    http://{api_host}/produtos/adicionar

### Resposta

  ```json
  {
    "mensagem": "Produto cadastrado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


| variável     | tipo               | descrição                 |
|:-------------|:---------------|:----------------------------|
| `mensagem`    |string                   | Retorna a mensagem de sucesso do servidor|
| `error`    |string                   | Retorna a mensagem de erro caso de algum erro|
| `data`    |Object                   | Retorna os dados do restaurante cadastrado|



### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": {}
  }
  ```

## Listagem de produtos de um restaurante

Utiliza-se o método `GET` no endpoint `/produtos/listar/{restauranteID}` para se obter uma listagem completa de todos os produtos vinculados ao restaurante selecionado. 
  
`GET /produtos/listar/{restauranteID}`

    http://{api_host}/produtos/listar/1234567

### Resposta

  ```json
  {
    "total":12,
    "produtos":[{}]
  }
  ```

| variável     | tipo               | descrição                 |
|:-------------|:---------------|:----------------------------|
| `total`    |int                   | Retorna a quantidade de produtos vinculados ao restaurante selecionado|
| `produtos`    |Array                   | Retorna todos os produtos vinculados ao restaurante selecionado|


### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": {}
  }
  ```

## Atualizando dados de um produto

Utiliza-se o método `PUT` no endpoint `/produtos/atualizar/{id}` passando como parâmetro o `id` do produto a ser editado. 

## Parâmetros
 Os parâmetros para a a alteração de dados são passados via `json` no body da requisição.

```json
{
    "nome": string,
    "preco": double,
    "categoria": string,
    "promocao": bool,
    "infoPromocao": {
        "descricao": string,
        "precoPromocional": double
    }
}
```
  
`PUT /produtos/atualizar/{id}`


### Resposta

  ```json
  {
    "mensagem": "Produto atualizado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "success": false,
    "error": "mensagem de erro",
    "data": null
  }
  ```

## Atualizando imagem de um produto

Utiliza-se o método `PUT` no endpoint `/produtos/atualizar-imagem/{id}` com o `content-type multipart/form-data` passando no campo `imagem` o arquivo a ser alterado.
  
`PUT /produtos/atualizar/{id}`


### Resposta

  ```json
  {
    "mensagem": "Produto atualizado com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "mensagem": "",
    "error": "mensagem de erro",
    "data": null
  }
  ```

## Excluindo um produto

Utiliza-se o método `DELETE` no endpoint `/produtos/excluir/{id}` passando como parâmetro o `id` do produto a ser excluido.
  
`DELETE /produtos/excluir/{id}`


### Resposta

  ```json
  {
    "mensagem": "Produto excluido com sucesso!",
    "error": "",
    "data": {}
  }
  ```


### Erro

  ```json
  {
    "success": false,
    "error": "mensagem de erro",
    "data": null
  }
  ````

---

# Servidor de arquivos estáticos

Para a rederização das imagens dos restaurantes e dos produtos, o projeto conta com uma URL para servir os arquivos de imagem salvos na pasta `uploads`.
Para acessar as imagens salvas basta utilizar um método `GET` no endpoint `/arquivos/nome_da_image.ext`. O nome do arquivo salvo é o mesmo que consta no campo `imagem` tanto dos produtos quanto dos restaurantes. 

---

# Modelos

## Resturante

```json
{
    "_id":    ObjectId,
    "nome":   String,
    "imagem": String, 
    "endereco": {
        "logradouro":  String, 
        "numero":      Number, 
        "bairro":      String, 
        "cidade":      String, 
        "estado":      String,
        "complemento": String
    },
    "created": Date,
    "updated": Date
}
```

## Produto

```json
{
    "_id":           ObjectId,
    "restauranteID":  ObjectId,
    "nome":           String,
    "imagem":         String,
    "preco":          Number,
    "categoria":      String,
    "promocao":       Boolean,
    "infoPromocao": {
        "descricao": String,
        "precoPromocional": Number
    },
    "created": Date,
    "updated": Date
```
}

# Notas Finais

* Para as próximas versões da API, será necessária a adição de rotas autenticadas com login e senha e algum sistema de segurança (JWT, CORS, etc)
* Para as próximas versões seria ideal colocar os arquivos de upload em algum storage na nuvem como a `Amazon AWS`.
* A criação de endpoits com filtros e a exclusão de todos os produtos após excluir os restaurantes seria o próximo ponto de melhoria.
---


