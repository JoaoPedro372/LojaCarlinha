// backend/models/Produto.js
const mongoose = require('mongoose');

// Define o esquema do produto
const VendaSchema = new mongoose.Schema({
    dateTime: { type: String, required: true },
    productName: { type: String, required: true},
    qtde: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    paymentType: { type: String },
});

// Exporta o modelo para ser utilizado em outros arquivos
module.exports = mongoose.model('Vendas', VendaSchema);