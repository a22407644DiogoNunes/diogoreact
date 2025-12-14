import caracteristicas from "../../data/caracteristicas.json";
import Link from "next/link";

// Tipagem para os params da rota
interface Params {
  params: { caracteristica: string };
}

// Gera os caminhos estáticos para todas as características
export async function generateStaticParams() {
  return caracteristicas.map(c => ({ caracteristica: c.nome }));
}

export default function CaracteristicaPage({ params }: Params) {
  const nome = decodeURI(params.caracteristica);

  const caract = caracteristicas.find(c => c.nome === nome);

  if (!caract) {
    return <h1 className="text-white text-center mt-20">Característica não encontrada</h1>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="bg-slate-800 p-8 rounded-xl w-2/3 text-center">
        <h1 className="text-3xl font-bold mb-4">{caract.nome}</h1>
        <p className="mb-6">{caract.descricao}</p>

        <Link href="/caracteristicas" className="bg-blue-500 px-4 py-2 rounded-lg">
          Voltar
        </Link>
      </div>
    </main>
  );
}