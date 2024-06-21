<h1 align="center">Fastpay Teste </h1>

<!-- Tags -->

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=21.1.0&color=835AFD&labelColor=000000">
</p>

<!-- Menu -->

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;
</p>

<!-- Body -->

<h1>Backend</h1>

## 👋 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### Ferramentas

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs)

### SGBD

- [PostgreSQL](https://www.postgresql.org/)

### Padronização

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Environment

- [Docker Compose](https://docs.docker.com/compose/)

## 💻 Projeto

O teste fastpay é uma api RESTfull desenvolvida para o gerenciamento de transações por categorias de um usuário, este projeto foi idealizado pela empresa **Fasytpay**

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Lucas4dum/teste-fastpay-fullstack
$ cd teste-fastpay-fullstack
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Inicializar banco de dados
$ docker-compose up -d

# Instalar as dependências
$ yarn

# Iniciar o projeto em ambiente de desenvolvimento
$ yarn dev
```

O serviço estará disponível pelo endereço http://localhost:3333.

A documentação(**Swagger**) da rota pode ser encontrada no endereço: http://localhost:3333/docs.

Existe um arquivo com a collection para ser utilizada no **Postman**: [Download](https://drive.google.com/file/d/1rQUUf6OxaxVy4Rrh9xMMCL5Y3E84vmlp/view?usp=sharing)

### ⚙️ Configuração

Não se esqueça de configurar o arquivo de variáveis ambiente para que o projeto funcione corretamente.

Duplique o arquivo `.env.example` alterando o nome para `.env` e depois preencha as variáveis necessárias.

---

<!-- Footer -->

Desenvolvido por [Lucas Adum](https://www.linkedin.com/in/lucas-adum/).
