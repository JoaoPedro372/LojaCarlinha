// backend/routes/produtos.js
const express = require('express');
const Venda = require('../models/Venda'); // Importa o modelo Produto
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const vendas = await Venda.find();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vendas' });
  }
});

// Rota para adicionar um novo produto
router.post('/', async (req, res) => {
  const novaVenda = new Venda(req.body);
  try {
    await novaVenda.save();
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar venda' });
  }
});

module.exports = router;
