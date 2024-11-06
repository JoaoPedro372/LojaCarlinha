// backend/routes/produtos.js
const express = require('express');
const Produto = require('../models/Produto'); // Importa o modelo Produto
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Rota para adicionar um novo produto
router.post('/', async (req, res) => {
  const novoProduto = new Produto(req.body);
  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar produto' });
  }
});

module.exports = router;
