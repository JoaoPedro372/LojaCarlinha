// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conecta ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Importa e usa a rota de produtos
const produtosRouter = require('./routes/produtos');
app.use('/produtos', produtosRouter);

// Importa e usa a rota de vendas
const vendasRouter = require('./routes/vendas');
app.use('/vendas', vendasRouter);

// Configura a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
