<h1 align="center">Fastpay Teste </h1>

<!-- Tags -->

<p align="center">
   <img src="https://img.shields.io/static/v1?label=NodeJS&message=21.1.0&color=#009CA3%3CCOLOR%3E&style=plastic%3CSTYLE%3E&logo=react%3CLOGO%3E" alt="Versão do TailwindCSS" />
  <img src="https://img.shields.io/static/v1?label=TailwindCSS&message=3.4.4&color=#009CA3%3CCOLOR%3E&style=plastic%3CSTYLE%3E&logo=react%3CLOGO%3E" alt="Versão do TailwindCSS" />
  <img src="https://img.shields.io/static/v1?label=Typescript&message=5.5.2&color=#009CA3%3CCOLOR%3E&style=plastic%3CSTYLE%3E&logo=react%3CLOGO%3E" alt="Versão do Typescript" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=14.2.3&color=#009CA3%3CCOLOR%3E&style=plastic%3CSTYLE%3E&logo=react%3CLOGO%3E" alt="Versão do NextJS" />
  <img src="https://img.shields.io/static/v1?label=NestJS&message=10.3.9&color=#009CA3%3CCOLOR%3E&style=plastic%3CSTYLE%3E&logo=react%3CLOGO%3E" alt="Versão do NextJS" />
</p>

<!-- Menu -->

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;
</p>

<!-- Body -->

# 👋 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### Ferramentas

#### Backend

- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs)

#### Frontend

- [NextJS](https://nextjs.org/)
- [TawindCSS](https://tailwindcss.com/)

### SGBD

- [PostgreSQL](https://www.postgresql.org/)

### Padronização

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Environment

- [Docker Compose](https://docs.docker.com/compose/)

### Framework HTTP:

- [Axios](https://axios-http.com/)

## 💻 Projeto

O teste fastpay é uma api RESTfull juntamente com um web site para o gerenciamento das transações com divisões por categoria de um usuário, este projeto foi idealizado pela empresa **Fasytpay**.

## 🚀 Como executar Backend

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Lucas4dum/teste-fastpay-fullstack
$ cd teste-fastpay-fullstack/backend
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Inicializar banco de dados
$ docker-compose up -d

# Instalar as dependências
$ yarn

# Criar a migration das tabelas
$ yarn prisma:migrate:dev

# Iniciar o projeto em ambiente de desenvolvimento
$ yarn dev
```

Em caso de problema com os volumes do docker siga os comandos abaixo:

```bash
# Visualizar os containeres
docker ps -a

# Pausar os containers
docker-compose down

# Listar os volumes
docker volume ls

# Apagar todos os volumes e lista os hashs apagados
$ docker volume rm $(docker volume ls -q)

# CUIDADO - Containeres desta maneira serão apagados caso estejam inutilizados
$ docker system prune -a --volumes

# Apagar a pasta onde o banco local é salvo
$ sudo rm -rf ./postgres/data
```

O serviço estará disponível pelo endereço http://localhost:3333.

<b>Para ter acesso as rotas no insomnia [clique aqui](https://drive.google.com/file/d/1tqC427MvaQgQr-3VSBgkns2adOxEUuAX/view?usp=sharing).</b>

A documentação(**Swagger**) da rota pode ser encontrada no endereço: http://localhost:3333/docs.

### ⚙️ Configuração

Não se esqueça de configurar o arquivo de variáveis ambiente para que o projeto funcione corretamente.

Duplique o arquivo `.env.example` alterando o nome para `.env` e depois preencha as variáveis necessárias.

## 🚀 Como executar Frontend

<b>Projeto no figma [clique aqui](https://www.figma.com/design/NhL9g5b7uW452ghmIMpA32/Teste-Fastpay?node-id=0-1&t=zXb165iIZskjNafK-1)</b>.

Depois de clonado o projeto acesse a pasta do mesmo.

```bash
$ cd teste-fastpay-fullstack/frontend
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ yarn

# Iniciar o projeto em ambiente de desenvolvimento
$ yarn dev
```

O serviço estará disponível pelo endereço http://localhost:3000.

---

<!-- Footer -->

Desenvolvido por [Lucas Adum](https://www.linkedin.com/in/lucas-adum/).
