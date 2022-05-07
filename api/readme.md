
## _Documentação da API_




## Features

- Cadastro de usuário e login
- Criação de produtos
- Busca por produtos dentro do estoque
- Montagem de Combos
- Mecanismo de busca por tags
- Listagem de pedidos por status



## Rotas

# Usuário
```sh
# Criação de usuário [POST] 
/user/new

> BodyParams: 
{
"Name": "Joh",
"CPF":"123456789",
"Birthday": "2000-05-17",
"Password": "myPassword",
"Zipcode":"30350250",
"Address":"Rua abc, numero 5"
}
> Response: Mensagem de sucesso ou erro
```
---

```sh
# Login [POST]
/user/login

> BodyParams:
{
"CPF":"123456789",
"Password": "myPassword",
}
> Response: Retorna um token com validade de 8h
{
	"token": "eyJhbGci...zUClg"
}
```
---

# Estoque
```sh
# Criar sabor de Pizza  [POST]
stock/pizza/flavor/new

> BodyParams:
{
"Name": "Mussarela",
"Description": "Sabor mussarela defumada",
}
> Response: Retorna um token com validade de 8h
{
	"token": "eyJhbGci...zUClg"
}
```
---
