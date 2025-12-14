import caracteristicas from "../../data/caracteristicas.json";
import Link from "next/link";
import { notFound } from "next/navigation";

// Tipagem para cada característica
interface Caracteristica {
  nome: string;
  descricao: string;
}

// Gera os paths estáticos para SSG
export async function generateStaticParams() {
  return caracteristicas.map(c => ({ caracteristica: c.nome }));
}

export default function CaracteristicaPage({ params }: { params: { caracteristica: string } }) {
  const slugRecebido = decodeURIComponent(params.caracteristica).toLowerCase().trim();

  const caract = caracteristicas.find(
    (c: Caracteristica) => c.nome.toLowerCase().trim() === slugRecebido
  );

  if (!caract) {
    notFound(); // 404 oficial do Next.js
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="bg-slate-800 p-10 rounded-xl max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">{caract.nome}</h1>
        <p className="text-lg leading-relaxed mb-10">{caract.descricao}</p>

        <Link
          href="/caracteristicas"
          className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg text-lg inline-block"
        >
          ← Voltar para lista
        </Link>
      </div>
    </main>
  );
}