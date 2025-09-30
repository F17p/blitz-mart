
import { useEffect, useState } from 'react';
import productsData from '../data/products';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [products] = useState(productsData);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  // carregar carrinho do localStorage
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('blitz_cart_v2') : null;
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // salvar carrinho
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('blitz_cart_v2', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }
  function changeQty(id, delta) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }
  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  async function handleCheckout() {
    if (cart.length === 0) { alert('Carrinho vazio'); return; }
    // chama a API serverless para criar sessão Stripe (já tens /api/create-checkout-session.js)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Erro ao iniciar checkout');
    } catch (err) {
      console.error(err); alert('Erro no pedido de checkout');
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-[1200px] mx-auto">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} />

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] rounded-xl px-3 py-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Procurar produtos..." className="bg-transparent outline-none w-72 text-sm" />
        </div>
      </div>

      <main className="grid gap-6 md:grid-cols-[1fr_320px]">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Produtos em destaque</h2>
            <div className="text-sm text-slate-400">{filtered.length} produtos</div>
          </div>

          <div className="grid gap-4 grid-cols-product">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>

        <aside className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-4">
          <h3 className="font-semibold">Resumo do Carrinho</h3>
          <div className="mt-3 flex flex-col gap-3">
            {cart.length===0 ? (
              <div className="text-sm text-slate-400">Carrinho vazio</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-md bg-cover bg-center" style={{backgroundImage:`url(${item.image})`}} />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.price.toLocaleString('pt-PT')} Kz x {item.qty}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-sm font-bold">{(item.price * item.qty).toLocaleString('pt-PT')} Kz</div>
                    <div className="flex gap-1 mt-2">
                      <button onClick={()=>changeQty(item.id, -1)} className="px-2 py-1 rounded bg-[rgba(255,255,255,0.03)]">-</button>
                      <div className="px-2 py-1 rounded bg-[rgba(255,255,255,0.03)]">{item.qty}</div>
                      <button onClick={()=>changeQty(item.id, +1)} className="px-2 py-1 rounded bg-[rgba(255,255,255,0.03)]">+</button>
                      <button onClick={()=>removeFromCart(item.id)} className="px-2 py-1 rounded border">Rem</button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="mt-2 border-t pt-3 flex items-center justify-between font-bold">
              <div>Total</div>
              <div>{total.toLocaleString('pt-PT')} Kz</div>
            </div>

            <button onClick={handleCheckout} className="mt-3 w-full px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-[var(--bm-accent)] to-[var(--bm-accent-2)] text-black">Finalizar Compra</button>
            <div className="text-xs text-slate-400 mt-2">Pagamento: Stripe (teste). Envio: integrar dropshipping depois.</div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
