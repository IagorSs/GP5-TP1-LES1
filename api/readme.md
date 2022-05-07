
## _Documentação da API_




## Features

- Cadastro de usuário e login
- Criação de produtos
- Busca por produtos dentro do estoque
- Montagem de Combos
- Mecanismo de busca por tags
- Listagem de pedidos por status



## Rotas
```sh
Criação de usuário [POST]-> /user/new
> Body params
{
"Name": "Joh",
"CPF":"123456789",
"Birthday": "2000-05-17",
"Password": "myPassword",
"Zipcode":"30350250",
"Address":"Rua abc, numero 5"
}
Response: Mensagem de sucesso ou erro
```
---

```sh
Login [POST]-> /user/login
> Body params
{
"CPF":"123456789",
"Password": "myPassword",
}
Response: Retorna um token com validade de 8h
{
	"token": "eyJhbGci...zUClg"
}
```
---
