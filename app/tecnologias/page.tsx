import React from "react";
import tecnologias from '@/app/data/tecnologias.json';
import Link from "next/link";

interface TecnologiaCard { titulo: string; imagem: string; indice?: number }

export default function TecnologiasPage() {
    const tecno = tecnologias;

    return (
        <div className="bg-blue-200 min-h-screen p-6 flex flex-col items-center">
            <header className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Tecnologias Exploradas</h1>
                <nav className="flex gap-4">
                    <Link href="/">Intro</Link>
                    <Link href="/sobre">Sobre</Link>
                    <Link href="/caracteristicas">Caracteristicas</Link>
                    <Link href="/tecnologias">Tecnologias</Link>
                    <Link href="/projetos">Projetos</Link>
                </nav>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {tecno.map((item, i) => (
                    <TecnologiaCard key={i} titulo={item.title} imagem={item.image} indice={i} />
                ))}
            </div>
        </div>
    )
}

function TecnologiaCard({ titulo, imagem, indice }: TecnologiaCard) {
    return (
        <Link href={`/tecnologias/${indice}`}>
            <div className="bg-slate-900 w-56 h-56 rounded-xl flex flex-col items-center justify-center p-4 shadow-lg hover:scale-105 transition-transform">
                <img src={imagem} alt={titulo} className="w-20 h-20 object-contain mb-2" />
                <h3 className="text-white font-semibold text-lg text-center">{titulo}</h3>
            </div>
        </Link>
    );
}