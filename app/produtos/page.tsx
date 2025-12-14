'use client';

import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/app/components/MagiaDoJSX/ProdutoCard";
import { useState, useEffect } from "react";
import PesquisarProdutos from "@/app/components/MagiaDoJSX/PesquisaProduto";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
};

export default function ProdutosPage() {
  const [search, setSearch] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome-asc");

  // Estado do carrinho
  const [cart, setCart] = useState<Product[]>([]);
  const [student, setStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [purchaseResponse, setPurchaseResponse] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products/",
    fetcher
  );

  // Inicializa cart a partir do localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Atualiza localStorage sempre que cart muda
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filtrar e ordenar produtos
  const filteredData = data
    ? [...data]
        .filter((produto) => produto.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          switch (ordenacao) {
            case "nome-asc": return a.title.localeCompare(b.title);
            case "nome-desc": return b.title.localeCompare(a.title);
            case "preco-asc": return a.price - b.price;
            case "preco-desc": return b.price - a.price;
            default: return 0;
          }
        })
    : [];

  // Funções do carrinho
  const addToCart = (produto: Product) => {
    if (!cart.find((p) => p.id === produto.id)) setCart([...cart, produto]);
  };

  const removeFromCart = (produtoId: number) => {
    setCart(cart.filter((p) => p.id !== produtoId));
  };

  const totalPrice = cart.reduce((acc, produto) => acc + Number(produto.price), 0);

  // Função de compra
  const buy = async () => {
    if (cart.length === 0) {
      setPurchaseResponse("O carrinho está vazio!");
      return;
    }

    setIsPurchasing(true);
    setPurchaseResponse(null);

    try {
      const response = await fetch("https://deisishop.pythonanywhere.com/buy/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart.map((p) => p.id),
          name: "Cliente",
          student,
          coupon: coupon.trim(),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao comprar");
      }

      const data = await response.json();
      const total = data.total_price ?? totalPrice.toFixed(2);
      setPurchaseResponse(`Compra efetuada com sucesso!\nTotal pago: ${total} €`);

      setCart([]);
      setCoupon("");
      setStudent(false);
      localStorage.removeItem("cart");
    } catch (err: any) {
      console.error(err);
      setPurchaseResponse(`Erro ao processar a compra: ${err.message}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (error) return <div className="text-red-500">Erro: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center items-center"><span className="loader"></span>Carregando...</div>;
  if (!data) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {/* Pesquisa */}
      <PesquisarProdutos pesquisa={search} setPesquisa={setSearch} />

      {/* Ordenação */}
      <div className="mt-4 mb-6">
        <label htmlFor="ordenacao" className="mr-2 font-semibold">Ordenar por:</label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="border rounded p-2"
        >
          <option value="nome-asc">Nome (A → Z)</option>
          <option value="nome-desc">Nome (Z → A)</option>
          <option value="preco-asc">Preço (Crescente)</option>
          <option value="preco-desc">Preço (Decrescente)</option>
        </select>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredData.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAddToCart={() => addToCart(produto)}
          />
        ))}
      </div>

      {/* Carrinho */}
      <div className="mt-12 p-4 border-t">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Nenhum produto no carrinho</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  produto={produto}
                  onRemoveFromCart={() => removeFromCart(produto.id)}
                  isInCart
                />
              ))}
            </div>
            <p className="mt-4 font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Finalizar compra */}
      <div className="mt-8 p-4 border rounded max-w-md">
        <h2 className="text-xl font-bold mb-4">Finalizar compra</h2>

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={student}
            onChange={(e) => setStudent(e.target.checked)}
          />
          Estudante DEISI
        </label>

        <input
          type="text"
          placeholder="Cupão de desconto"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={buy}
          disabled={cart.length === 0 || isPurchasing}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isPurchasing ? "A processar..." : "Comprar"}
        </button>

        {/* Mensagem de compra */}
        {purchaseResponse && (
          <div
            className={`mt-4 p-4 rounded text-center text-lg font-medium ${
              purchaseResponse.includes("sucesso")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {purchaseResponse.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}