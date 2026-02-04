# Backend – Você calcula

Backend desenvolvido em **Node.js + TypeScript**, estruturado seguindo o padrão **MVC (Model–View–Controller)**, com foco em organização, separação de responsabilidades e facilidade de manutenção.

### Arquitetura (MVC)

* **Models**: responsáveis pela estrutura e persistência dos dados no MongoDB
* **Services**: regras de negócio e integrações externas (API de câmbio)
* **Controllers**: controle das requisições e respostas HTTP
* **Jobs**: tarefas agendadas para atualização automática de dados
* **Database**: conexão centralizada com o MongoDB Atlas

---

## Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* MongoDB Atlas
* Mongoose
* Agenda (jobs)
* Axios
* Dotenv
* Nodemon

---

## Pré-requisitos globais

```bash
npm i -g nodemon typescript ts-node
```

---

## Instalação

```bash
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` com:

```env
PORT=3000
DATABASE_URI=your_mongodb_uri
EXCHANGE_RATES_API_KEY=your_api_key
```

---

## Rodando o projeto

```bash
npm run dev
```