const STORAGE_KEY = 'ecommerce_carrinho';

const Carrinho = {
  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  save(itens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    this.atualizarContador();
  },

  add(produto, qty = 1) {
    const itens = this.getAll();
    const idx = itens.findIndex(i => i.id === produto.id);
    if (idx >= 0) {
      itens[idx].qty += qty;
    } else {
      itens.push({ ...produto, qty });
    }
    this.save(itens);
  },

  remove(id) {
    this.save(this.getAll().filter(i => i.id !== id));
  },

  update(id, qty) {
    if (qty <= 0) return this.remove(id);
    const itens = this.getAll();
    const idx = itens.findIndex(i => i.id === id);
    if (idx >= 0) { itens[idx].qty = qty; this.save(itens); }
  },

  getTotal() {
    return this.getAll().reduce((acc, i) => acc + i.preco * i.qty, 0);
  },

  getCount() {
    return this.getAll().reduce((acc, i) => acc + i.qty, 0);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
    this.atualizarContador();
  },

  atualizarContador() {
    const el = document.querySelector('.cart-count');
    if (el) {
      const count = this.getCount();
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }
};

function showToast(msg, tipo = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${tipo}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => Carrinho.atualizarContador());
