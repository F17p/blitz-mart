import products from "../../data/products.js";
import Link from "next/link";

export default function ProductPage({ product }) {
  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} width="300" />
      <p>{product.description}</p>
      <p><strong>Preço:</strong> {product.price} Kz</p>
      <Link href="/">← Voltar à loja</Link>
    </div>
  );
}

// Gera todas as rotas possíveis (um para cada produto)
export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { slug: product.slug.toString() }, // 👈 garante que slug é string
  }));

  return { paths, fallback: false };
}

// Busca os dados de cada produto
export async function getStaticProps({ params }) {
  const product = products.find((p) => p.slug.toString() === params.slug);

  return {
    props: { product: product || null },
  };
}
