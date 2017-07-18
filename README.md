# Encurtador de URL utilizando NodeJS e MongoDB

Esse projeto foi realizado para cadastrar Usuários e URL utilizando RESTful para consultar, cadastros e exclusões.
Apenas o método de acesso a URL original utilizando a URL encurtada pode ser acessado pelo método GET, fazendo um redirect.

Utilizamos uma arquitetura simples no projeto, contendo uma pasta API, onde se tem os modelos e middleware, e a pasta CONFIG, onde é cadastrado as rotas, configurações do servidor e banco de dados.

Instalando e colocando para trabalhar
-------------------------------------------

O projeto pode ser instalado em qualquer OS, basta fazer a instalação do NodeJS e MongoDB.

Para facilitar a vida dos usuários Linux, fiz dois scripts para fazer a instalação e iniciar o sistema.
Sendo assim, baixem o instalador install.sh e o start.sh.

### Instalação

Execute os seguintes comandos para executar o install.sh.
```
chmod +x install.sh
sudo ./install.sh
```

Após a conclusão dos scripts install.sh, é só rodar o start.sh da mesma maneira para iniciar o mesmo.
```
chmod +x start.sh
sudo ./start.sh
```

Configurações Iniciais
-------------------------

Dentro da pasta `config`, no arquivo `database.js` já está com as mesmas configurações iniciais do MongoDB e com o host como localhost por padrão. Caso tenha necessidade alguma informação do banco, faça antes de iniciar executar o `start.sh`.

Continuando na pasta `config`, o servidor tem a porta 3003 configurada como padrão. Você pode alterar a porta em qualquer, mesmo que já tenha URLs cadastradas no sistema. Isso não irá atrapalhar o funcionamento do mesmo, caso posteriormente seja alterado a porta do servidor.

Utilizando a API
-----------------

Possuímos alguns métodos RESTful com `Content-Type: application/json` para fazer o cadastro, exclusão e consulta de status dos usuários e urls.

### Métodos para os Usuários

### ```POST /users```

Método utilizado para cadastrar novos usuários. Recebe como parâmetro um objeto JSON contendo o `id` do usuário. Como resposta, é retornado o objeto cadastrado com o código `201 Created`. Caso já tenha um usuário com o mesmo `id`, é retornado o código `409 Conflict`.
```
{
  "id": "joao"
}
```

### ```POST /users/:userId/urls```
Utilizado para cadastrar uma nova URL. A resposta da requisição será um objeto JSON com as informações a seguir. É retornado um código `201 Created`.
```
{
  "id": "23094",
  "hits": 0,
  "url": "http://www.chaordic.com.br/folks",
  "shortUrl": "http://<host>[:<port>]/asdfeiba"
}
```

### ```GET /users/:userId/stats```
Retorna estatísticas das URLs de um usuário especifico. Utiliza o mesmo modo do `GET /stats`, mas com o escopo dentro de um usuário.
Caso o usuário não exista, é retornado o código `404 Not Found`

### ```DELETE /users/:userId```
Utilizado para excluir um usuário. No momento da exclusão deste usuário, é excluído suas URLs cadastradas. Como retorno, é devolvido um objeto JSON vazio `{}`.

### ```GET /urls/urlId```
Método retorna um `301 redirect` para o endereço original da URL. Esse é o único método que não existe a necessidade do RESTful com `Content-Type: application/json`.

### ```GET /stats```
Retorna estatísticas globais do sistema, com o total de hits, quantidade de URLs cadastradas e as TOP 10 que possuem a maior quantidade de hits.
```
{
  "hits": 193841,
  "urlCount": 2512,
  "topUrls": [
    {
      "id": "23094",
      "hits": 153,
      "url": "http://www.chaordic.com.br/folks",
      "shortUrl": "http://<host>[:<port>]/asdfeiba"
    },
    {
      "id": "23090",
      "hits": 89,
      "url": "http://www.chaordic.com.br/chaordic",
      "shortUrl": "http://<host>[:<port>]/asdfeiba"
    },
    // ...
  ]
}
```

### ```GET /stats/:urlId```
Retorna as informações da URL específica em um objeto JSON.
```
{
  "id": "23094",
  "hits": 125,
  "url": "http://www.chaordic.com.br/folks",
  "shortUrl": "http://<host>[:<port>]/asdfeiba"
}
```

### ```DELETE /urls/:urlId```
É excluído a URL específica do banco de dados. É retornado um objeto JSON vazio `{}`.
