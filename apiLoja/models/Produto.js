// backend/models/Produto.js
const mongoose = require('mongoose');

// Define o esquema do produto
const ProdutoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Exporta o modelo para ser utilizado em outros arquivos
module.exports = mongoose.model('Produto', ProdutoSchema);
