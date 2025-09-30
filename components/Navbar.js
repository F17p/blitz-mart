
import Link from 'next/link';

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Link href="/"><a className="w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-black bg-gradient-to-br from-[var(--bm-accent)] to-amber-300">BM</a></Link>
        <div>
          <h1 className="text-xl font-bold">Blitz Mart</h1>
          <p className="text-sm text-slate-400">Loja diversa — preparada para integrar dropshipping</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/"><a className="text-sm text-slate-300">Produtos</a></Link>
        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl px-3 py-2">
          <span className="text-sm font-semibold">{cartCount} no carrinho</span>
        </div>
      </div>
    </header>
  );
}
