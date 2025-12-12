import { Product } from '@/models/interfaces';
import Link from 'next/link';
import Image from 'next/image';

interface ProdutoCardProps {
  produto: Product;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  isInCart?: boolean; // indica se está no carrinho
}

export default function ProdutoCard({ produto, onAddToCart, onRemoveFromCart, isInCart }: ProdutoCardProps) {
  const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
      <Image src={imageUrl} alt={produto.title} width={150} height={150} className="object-contain mb-2" />
      <h2 className="font-bold text-lg">{produto.title}</h2>
      <p className="text-green-600 font-semibold">${produto.price}</p>

      {/* Botão para carrinho */}
      {!isInCart && onAddToCart && (
        <button
          onClick={onAddToCart}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Adicionar ao carrinho
        </button>
      )}

      {isInCart && onRemoveFromCart && (
        <button
          onClick={onRemoveFromCart}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remover do carrinho
        </button>
      )}

      {/* Botão +info */}
      <Link href={`/produtos/${produto.id}`} className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        +info
      </Link>
    </div>
  );
}