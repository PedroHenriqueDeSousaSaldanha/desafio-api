# API de Gerenciamento de Pedidos

API REST desenvolvida em **Node.js** utilizando **Express** e **MongoDB** para gerenciar pedidos.
A aplicação permite criar, consultar, listar, atualizar e deletar pedidos.

---

# 🚀 Tecnologias utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Dotenv
* Nodemon

---

# 📂 Estrutura do Projeto

```
desafio-api
│
├── node_modules
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Instalação

### 1️⃣ Clonar o repositório

```
git clone https://github.com/SEU-USUARIO/desafio-api.git
```

### 2️⃣ Entrar na pasta do projeto

```
cd desafio-api
```

### 3️⃣ Instalar dependências

```
npm install
```

---

# 🔑 Configuração

Crie um arquivo **.env** na raiz do projeto.

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/desafioPedidos
```

---

# ▶️ Executar o projeto

Modo desenvolvimento:

```
npm run dev
```

A API ficará disponível em:

```
http://localhost:3000
```

---

# 📦 Endpoints da API

## Criar pedido

**POST**

```
/order
```

Exemplo de Body:

```
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "itemId": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

---

## Buscar pedido

**GET**

```
/order/:numeroPedido
```

Exemplo:

```
/order/v10089015vdb-01
```

---

## Listar todos os pedidos

**GET**

```
/order/list
```

---

## Atualizar pedido

**PUT**

```
/order/:numeroPedido
```

---

## Deletar pedido

**DELETE**

```
/order/:numeroPedido
```

---

# 🗄️ Banco de Dados

A API utiliza **MongoDB** para armazenar os pedidos.

Estrutura salva no banco:

```
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

# 🧪 Testando a API

A API pode ser testada usando:

* Thunder Client (VS Code)
* Postman
* Insomnia

---

# 📌 Autor

Pedro Henrique de Sousa Saldanha

LinkedIn:
https://www.linkedin.com/in/phsaldanha/

GitHub:
https://github.com/PedroHenriqueDeSousaSaldanha
