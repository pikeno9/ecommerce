let todosProdutos = [];

function renderCards(lista) {
  const grid = document.getElementById('produtos-grid');
  if (!lista.length) {
    grid.innerHTML = '<p style="color:var(--text-muted)">Nenhum produto encontrado.</p>';
    return;
  }
  grid.innerHTML = lista.map(p => `
    <div class="card">
      <a href="produto.html?id=${p.id}">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
      </a>
      <div class="card-body">
        <span class="card-categoria">${p.categoria}</span>
        <a href="produto.html?id=${p.id}" class="card-nome">${p.nome}</a>
        <div class="card-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" onclick="adicionarAoCarrinho(${p.id})">
          🛒 Adicionar
        </button>
        <a href="produto.html?id=${p.id}" class="btn btn-outline">Ver</a>
      </div>
    </div>
  `).join('');
}

function adicionarAoCarrinho(id) {
  const produto = todosProdutos.find(p => p.id === id);
  if (produto) {
    Carrinho.add(produto, 1);
    showToast(`✓ ${produto.nome} adicionado ao carrinho!`, 'success');
  }
}

function filtrar(categoria) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
  event.target.classList.add('ativo');
  const lista = categoria === 'Todos' ? todosProdutos : todosProdutos.filter(p => p.categoria === categoria);
  renderCards(lista);
}

async function init() {
  try {
    todosProdutos = await getProdutos();

    const categorias = ['Todos', ...new Set(todosProdutos.map(p => p.categoria))];
    const filtrosEl = document.getElementById('filtros');
    filtrosEl.innerHTML = categorias.map((c, i) =>
      `<button class="filtro-btn ${i === 0 ? 'ativo' : ''}" onclick="filtrar('${c}')">${c}</button>`
    ).join('');

    renderCards(todosProdutos);
  } catch (err) {
    document.getElementById('produtos-grid').innerHTML =
      '<p style="color:red">Erro ao carregar produtos. Verifique se o servidor está rodando.</p>';
  }
}

init();
