'use client';

import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/app/components/MagiaDoJSX/ProdutoCard";
import { useState } from "react";
import PesquisarProdutos from "@/app/components/MagiaDoJSX/PesquisaProduto";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return res.json();
};

export default function ProdutosPage() {
  const [search, setSearch] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome-asc"); // estado para ordenação

  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products/",
    fetcher
  );

  if (error) return <div className="text-red-500">Erro: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center items-center"><span className="loader"></span>Carregando...</div>;
  if (!data) return null;

  // Filtrar produtos pelo nome
  let filteredData = data.filter((produto) =>
    produto.title.toLowerCase().includes(search.toLowerCase())
  );

  // Ordenar produtos
  filteredData.sort((a, b) => {
    switch (ordenacao) {
      case "nome-asc":
        return a.title.localeCompare(b.title);
      case "nome-desc":
        return b.title.localeCompare(a.title);
      case "preco-asc":
        return a.price - b.price;
      case "preco-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {/* Pesquisa */}
      <PesquisarProdutos pesquisa={search} setPesquisa={setSearch} />

      {/* Select para ordenação */}
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
        {filteredData.length > 0 ? (
          filteredData.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Nenhum produto encontrado
          </div>
        )}
      </div>
    </div>
  );
}