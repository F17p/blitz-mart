import { useRouter } from "next/router";
import products from "../../data/products";

export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  return { props: { product } };
}

export default function ProductPage({ product }) {
  const router = useRouter();

  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-80 object-cover mt-4 rounded-xl shadow-md"
      />
      <p className="mt-6 text-gray-700">{product.description}</p>
      <p className="mt-4 text-xl font-semibold text-indigo-600">
        {product.price} AOA
      </p>
      <button
        onClick={() => alert("Adicionar ao carrinho em breve!")}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
