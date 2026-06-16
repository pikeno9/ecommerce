const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const produtos = JSON.parse(fs.readFileSync(path.join(__dirname, 'produtos.json'), 'utf-8'));
const pedidos = [];

app.get('/api/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(produto);
});

app.post('/api/pedidos', (req, res) => {
  const { cliente, itens, total } = req.body;
  if (!cliente || !itens || !total) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }
  const pedido = {
    id: pedidos.length + 1,
    cliente,
    itens,
    total,
    data: new Date().toISOString()
  };
  pedidos.push(pedido);
  console.log(`\n[${pedido.data}] Novo pedido #${pedido.id} de ${cliente.nome} — R$ ${total.toFixed(2)}`);
  res.status(201).json({ mensagem: 'Pedido recebido com sucesso!', pedido });
});

app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});

app.listen(PORT, () => {
  console.log(`\n🛒 E-commerce rodando em http://localhost:${PORT}`);
  console.log(`   API disponível em http://localhost:${PORT}/api/produtos\n`);
});
