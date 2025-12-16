'use client';

import useSWR from "swr";

import { Pais } from "@/models/interfacesPais";
import PaisCard from "@/app/components/MagiaDoJSX/PaisCard";
import { useState, useEffect } from "react";
import PesquisarPais from "@/app/components/MagiaDoJSX/PesquisarPais";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
};

export default function PaisesPage() {
    const [search, setSearch] = useState("");   
    const [ordenacao, setOrdenacao] = useState("nome-asc");

    const [cart, setCart] = useState<Pais[]>([]);

    const { data, error, isLoading } = useSWR<Pais[]>(
    "https://restcountries.com/v3.1/independent?status=true&fields=name,area,population",
    fetcher
    );

      useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

      const filteredData = data
        ? [...data]
            .filter((pais) => pais.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
              switch (ordenacao) {
                case "nome-asc": return a.name.localeCompare(b.name);
                case "nome-desc": return b.name.localeCompare(a.name);
                default: return 0;
              }
            })
        : [];

  if (error) return <div className="text-red-500">Erro: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center items-center"><span className="loader"></span>Carregando...</div>;
  if (!data) return null;
    
return(
    <div>
              <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        
              {/* Pesquisa */}
              <PesquisarPais pesquisa={search} setPesquisa={setSearch} />
        
              {/* Ordenação */}
              <div className="mt-4 mb-6">
                <label htmlFor="ordenacao" className="mr-2 font-semibold">Ordenar por:</label>
                <select
                  id="ordenacao"
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="nome-asc"></option>
                  <option value="nome-desc"></option>
                  <option value="preco-asc">População(Ascendente)</option>
                  <option value="preco-desc">População (Descendente)</option>
                </select>
              </div>
        
    </div>
    )
}