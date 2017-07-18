# Encurtador de URL utilizando NodeJS e MongoDB

Esse projeto foi realizado para cadastrar Usuários e URL utilizando RESTful para consultar, cadastros e exclusões.
Apenas o metodo de acesso a URL original utilizando a URL encurtada pode ser acessado pelo metodo GET, fazendo um redirect.

Utilizamos uma arquitetura simples no projeto, contendo uma pasta API, onde se tem os modelos e middleware, e a pasta CONFIG, onde é cadastrados as rotas, configurações do servidor e banco de dados.

Instalando e colocando para trabalhar
-------------------------------------------

O projeto pode ser instalado em qualquer OS, basta fazer a instalação do NodeJS e MongoDB.

Para facilitar a vida dos usuários Linux, fiz dois scritps para fazer a instalação e iniciar o sistema.
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

Dentro da pasta `config`, no arquivo `database.js` já está com as mesmas configurações iniciais do MongoDB e com o host como localhost por padrão. Caso tenha nescessidade alguma informação do banco, faça antes de iniciar executar o `start.sh`.

Continuando na pasta `config`, o servidor tem a porta 3003 configurada como padrão. Você pode alterar a porta em qualquer, mesmo que já tenha URLs cadastradas no sistema. Isso não irá atrapalhar o funcionamento do mesmo, caso posteriormente sejá alterado a porta do servidor.


Utilizando a API
-----------------

Possuimos alguns metodos RESTful com `Content-Type: application/json` para fazer o cadastro, exclusão e consulta de status dos usuários e urls.

### Metodos para os Usuários

`POST /users`
Método utilizado para cadastrar novos uuários. Recebe como parametro um objeto JSON contendo o `id` do usuário. Como resposta, é retornado o objeto cadastrado com o código `201 Created`. Caso já tenha um usuário com o mesmo `id`, é retornado o código `409 Conflict`.
```
{
  "id": "joao"
}
```
