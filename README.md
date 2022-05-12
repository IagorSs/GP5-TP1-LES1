# Pizzaria Pizzada

## About project

This project consists of providing a system to control the delivery of a Pizzeria.

You can consult all info about dependencies, scripts, authors, etc. in [`package.json`](package.json)

## Installation

### Prerequisites

1. [NodeJs](https://nodejs.org/)
2. [Yarn](https://classic.yarnpkg.com/en/) *(Optional)*

### Configure environment

1. Create a copy of [`.env.example`](.env.example) file
2. Rename this file to [`.env`](.env)
3. Fill the fields properly

### Download dependencies

```bash
$npm install

#or

$yarn
```

### Configure database

User created in these steps must be inserted in the [`.env`](.env) file, as mentioned previously

#### Create database

```bash
$npx prisma generate
$npx prisma db push

#or

$yarn prisma generate
$yarn prisma db push
```

### Run project

```bash
$cd /api


$npm run dev

#or

$yarn dev
```

```bash
$cd /frontend


$npm run start

#or

$yarn start
```

## Legal Information

This project is protected by [copyright law](https://en.wikipedia.org/wiki/Copyright) making your copy or distribution illegal.

## Video
[Pizzaria Pizzada](https://youtu.be/WRI7TFMip2E)

## Developed by 
[Erick Henrique](https://github.com/ErickHDdS) <br />
[Iagor Souza](https://github.com/IagorSs) <br />
[Vitor Laguardia](https://github.com/vitor-laguardia) <br />
[Tarcisio Prates](https://github.com/t4rcisio) <br />
