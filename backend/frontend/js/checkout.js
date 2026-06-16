function renderResumo() {
  const itens = Carrinho.getAll();
  const lista = document.getElementById('resumo-lista');
  const total = Carrinho.getTotal();

  lista.innerHTML = itens.map(i => `
    <div class="resumo-linha">
      <span>${i.nome} × ${i.qty}</span>
      <span>R$ ${(i.preco * i.qty).toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');

  document.getElementById('resumo-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

document.getElementById('form-checkout').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btn-finalizar');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  const dados = {
    cliente: {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      endereco: {
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
      }
    },
    itens: Carrinho.getAll(),
    total: Carrinho.getTotal()
  };

  try {
    await enviarPedido(dados);
    Carrinho.clear();
    location.href = 'sucesso.html';
  } catch {
    showToast('Erro ao enviar pedido. Tente novamente.');
    btn.disabled = false;
    btn.textContent = 'Finalizar Pedido';
  }
});

renderResumo();
