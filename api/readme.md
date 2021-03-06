
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
# Criar  Pizza  [POST]
stock/pizza/new

> BodyParams:
{
"Name":"Pizza Queijo",
"Description":"Vem muito queijos",
"Flavors": "6271cf1ead8eb6d3b008822b,6271d11c5ce6a59d6ee2f12b", # Lista de 1 ou dois sabores
"Url": "https://i.imgur.com/FLB54LU.png",
"Price": "45.50",
"Size": "Media",
}
> Response: Mensagem de sucesso ou erro
```
---
```sh
# Obter Pizza  [GET]
stock/pizza

> BodyParams:
{
null || "pizzaId": "6271cf1ead8eb6d3b008822b"
}
> Response: Caso não seja especificado, retorna um array com todos os sabores
```
---

```sh
# Criar sabor de Pizza  [POST]
stock/pizza/flavor/new

> BodyParams:
{
"Name": "Mussarela",
"Description": "Sabor mussarela defumada",
}
> Response: Mensagem de sucesso ou erro
```
---
```sh
# Obter sabor de pizza  [GET]
stock/pizza/flavor/

> BodyParams:
{
null || "flavorId": "6271cf1ead8eb6d3b008822b"
}
> Response: Caso não seja especificado, retorna um array com todos os sabores
```
---
