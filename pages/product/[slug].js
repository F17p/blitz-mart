// /pages/product/[slug].js
import products from '../../data/products';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = products.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find(p => p.slug === params.slug);
  return { props: { product } };
}

export default function ProductPage({ product }) {
  const router = useRouter();

  function addToCart(productToAdd, qty = 1) {
    if (typeof window === 'undefined') return;
    const key = 'blitz_cart_v2';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const found = saved.find(i => i.id === productToAdd.id);
    if (found) {
      const updated = saved.map(i => i.id === productToAdd.id ? { ...i, qty: i.qty + qty } : i);
      localStorage.setItem(key, JSON.stringify(updated));
    } else {
      saved.push({ ...productToAdd, qty });
      localStorage.setItem(key, JSON.stringify(saved));
    }
    alert('Produto adicionado ao carrinho');
    router.push('/');
  }

  return (
    <div className="min-h-screen p-8 max-w-[900px] mx-auto">
      <Link href="/"><a className="text-slate-400 mb-4 inline-block">← Voltar</a></Link>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg h-96 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-slate-400 mt-2">{product.category} {product.owner && <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[rgba(94,243,195,0.12)] text-[var(--bm-accent-2)] font-bold inline-block">Teu</span>}</div>
          <div className="text-3xl font-extrabold mt-4">{product.price.toLocaleString('pt-PT')} Kz</div>
          <p className="mt-4 text-slate-300">{product.desc}</p>

          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product)} className="px-4 py-2 rounded-lg bg-[var(--bm-accent)] text-black font-bold">Adicionar ao Carrinho</button>
            <button onClick={() => router.push('/')} className="px-4 py-2 rounded-lg border">Continuar a Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
