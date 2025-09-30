
import Link from 'next/link';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-4 flex flex-col">
      <div className="h-44 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-300">{product.category} {product.owner && <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[rgba(94,243,195,0.12)] text-[var(--bm-accent-2)] font-bold inline-block">Teu</span>}</div>
          <div className="font-semibold">{product.title}</div>
        </div>
        <div className="text-lg font-extrabold">{product.price.toLocaleString('pt-PT')} Kz</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => onAdd(product)} className="px-3 py-2 rounded-lg bg-[var(--bm-accent)] text-black font-bold">Adicionar</button>
        <Link href={`/product/${product.slug}`}>
          <a className="px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-sm">Ver</a>
        </Link>
      </div>
    </article>
  );
}
