"use client"; // 🔑 Torna o componente Client Component

import React from "react";
import { useParams, useRouter } from "next/navigation";
import tecnologias from '@/app/data/tecnologias.json';

export default function TecnologiaPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const tecnologia = tecnologias[id];

    if (!tecnologia) {
        return <p className="text-center mt-10">Tecnologia não encontrada!</p>;
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">{tecnologia.title}</h1>

            <TecnologiaDetailsCard tecnologia={tecnologia} />

            <button
                onClick={() => router.push('/tecnologias')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Voltar
            </button>
        </div>
    );
}

// ------------------ TecnologiaDetailsCard ------------------
interface TecnologiaDetailsCardProps {
    tecnologia: {
        title: string;
        image: string;
        description: string;
        rating: number;
    };
}

function TecnologiaDetailsCard({ tecnologia }: TecnologiaDetailsCardProps) {
    return (
        <div className="bg-slate-800 p-6 rounded-xl w-96 flex flex-col items-center shadow-lg">
            <img src={tecnologia.image} alt={tecnologia.title} className="w-32 h-32 mb-4" />
            <p className="text-white text-center mb-4">{tecnologia.description}</p>
            <p className="text-yellow-400 font-semibold text-lg">
                {"⭐".repeat(tecnologia.rating)}
            </p>
        </div>
    );
}