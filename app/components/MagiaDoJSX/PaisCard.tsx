import { Product } from '@/models/interfaces';
import Link from 'next/link';
import Image from 'next/image';

interface PaisCardProps {
    nome: string;
    area: string;
    populacao: number;
}

export default function PaisCard({ nome, area, populacao }: PaisCardProps) {
    return (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
            <h2 className="font-bold text-lg mb-2">{nome}</h2>
            <p className="mb-1"><strong>Área:</strong> {area} km²</p>
            <p><strong>População:</strong> {populacao.toLocaleString()}</p>
        </div>
    );
}