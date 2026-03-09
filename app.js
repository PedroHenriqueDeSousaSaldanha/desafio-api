require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Banco conectado com sucesso!"))
  .catch((error) => console.log("Erro ao conectar no banco:", error));

const itemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [itemSchema]
});

const Order = mongoose.model("Order", orderSchema);

function mapOrderBody(body, orderIdFromParam = null) {
  return {
    orderId: orderIdFromParam || body.numeroPedido,
    value: body.valorTotal,
    creationDate: body.dataCriacao,
    items: (body.items || []).map((item) => ({
      productId: Number(item.itemId),
      quantity: Number(item.quantidadeItem),
      price: Number(item.valorItem)
    }))
  };
}

function validarBody(body) {
  if (!body.numeroPedido || !body.valorTotal || !body.dataCriacao || !body.items) {
    return "Campos obrigatórios: numeroPedido, valorTotal, dataCriacao e items.";
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return "O campo items deve ser um array com pelo menos 1 item.";
  }

  return null;
}

app.post("/order", async (req, res) => {
  try {
    const erroValidacao = validarBody(req.body);

    if (erroValidacao) {
      return res.status(400).json({ message: erroValidacao });
    }

    const orderData = mapOrderBody(req.body);
    const order = new Order(orderData);

    await order.save();

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      data: order
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Já existe um pedido com esse orderId." });
    }

    return res.status(500).json({
      message: "Erro ao criar pedido.",
      error: error.message
    });
  }
});

app.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar pedidos.",
      error: error.message
    });
  }
});

app.get("/order/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar pedido.",
      error: error.message
    });
  }
});

app.put("/order/:orderId", async (req, res) => {
  try {
    if (!req.body.valorTotal || !req.body.dataCriacao || !req.body.items) {
      return res.status(400).json({
        message: "Para atualizar, envie valorTotal, dataCriacao e items."
      });
    }

    const orderData = {
      orderId: req.params.orderId,
      value: req.body.valorTotal,
      creationDate: req.body.dataCriacao,
      items: (req.body.items || []).map((item) => ({
        productId: Number(item.itemId),
        quantity: Number(item.quantidadeItem),
        price: Number(item.valorItem)
      }))
    };

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      orderData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar pedido.",
      error: error.message
    });
  }
});

app.delete("/order/:orderId", async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    return res.status(200).json({ message: "Pedido deletado com sucesso." });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar pedido.",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});