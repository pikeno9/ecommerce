const API = 'https://ecommerce-production-a99c.up.railway.app/api';

async function getProdutos() {
  const res = await fetch(`${API}/produtos`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

async function getProduto(id) {
  const res = await fetch(`${API}/produtos/${id}`);
  if (!res.ok) throw new Error('Produto não encontrado');
  return res.json();
}

async function enviarPedido(dados) {
  const res = await fetch(`${API}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if (!res.ok) throw new Error('Erro ao enviar pedido');
  return res.json();
}
