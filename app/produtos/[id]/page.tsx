'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import ProdutoDetalhe from '@/app/components/MagiaDoJSX/ProdutoDetalhe';
import { Product } from '@/models/interfaces';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Erro ao buscar produto');
  }
  return res.json();
};

export default function ProdutoPage() {
  const params = useParams();
  const id = params?.id; // garante que id existe

  const { data, error, isLoading } = useSWR<Product>(
    id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
    fetcher
  );

  if (!id) return <div className="text-red-500">ID do produto não fornecido</div>;
  if (error) return <div className="text-red-500">Erro: {error.message}</div>;
  if (isLoading) return <div className="flex justify-center items-center h-64">Carregando...</div>;
  if (!data) return null;

  return <ProdutoDetalhe produto={data} />;
}