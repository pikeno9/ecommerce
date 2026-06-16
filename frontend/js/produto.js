let qty = 1;
let produto = null;

function atualizarQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById('qty-valor').textContent = qty;
}

async function init() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { location.href = 'index.html'; return; }

  try {
    produto = await getProduto(id);
    document.title = `${produto.nome} — Loja`;

    document.getElementById('produto-img').src = produto.imagem;
    document.getElementById('produto-img').alt = produto.nome;
    document.getElementById('produto-categoria').textContent = produto.categoria;
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-preco').textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    document.getElementById('produto-desc').textContent = produto.descricao;
    document.getElementById('produto-estoque').textContent = `${produto.estoque} em estoque`;
  } catch {
    document.getElementById('produto-container').innerHTML =
      '<p style="color:red">Produto não encontrado.</p>';
  }
}

function adicionarAoCarrinho() {
  if (!produto) return;
  Carrinho.add(produto, qty);
  showToast(`✓ ${qty}x ${produto.nome} adicionado ao carrinho!`, 'success');
}

init();
