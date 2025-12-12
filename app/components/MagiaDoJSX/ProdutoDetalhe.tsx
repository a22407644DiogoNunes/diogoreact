import { Product } from '@/models/interfaces';
import Link from 'next/link';

interface ProdutoDetalheProps {
    produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
    const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

    return (
        <div className="max-w-3xl mx-auto p-8">
            <img src={imageUrl} alt={produto.title} className="w-64 h-64 object-contain mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{produto.title}</h1>
            <p className="text-green-600 font-semibold text-xl mb-4">${produto.price}</p>
            <p className="mb-4"><strong>Categoria:</strong> {produto.category}</p>
            <p className="mb-4"><strong>Descrição:</strong> {produto.description}</p>
            <p><strong>Rating:</strong> {produto.rating.rate} ({produto.rating.count} avaliações)</p>

            <Link href="/produtos" className="mt-6 inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Voltar à lista de produtos
            </Link>
        </div>
    );
}