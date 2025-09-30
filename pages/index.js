import { useState } from "react";

const products = [
  { id: 1, name: "Camiseta Blitz", price: 5000 },
  { id: 2, name: "Boné Oficial", price: 3500 },
  { id: 3, name: "Tênis Casual", price: 15000 }
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const checkout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">🛒 Blitz Mart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-4 bg-white shadow rounded-xl">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-500">{p.price} AOA</p>
            <button
              className="mt-2 px-3 py-1 bg-primary text-white rounded-lg"
              onClick={() => addToCart(p)}
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-semibold">Carrinho</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Nenhum produto</p>
        ) : (
          <>
            <ul>
              {cart.map((item, i) => (
                <li key={i}>{item.name} — {item.price} AOA</li>
              ))}
            </ul>
            <button
              onClick={checkout}
              className="mt-3 px-4 py-2 bg-secondary rounded-lg font-bold"
            >
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}
