import Link from "next/link";

interface CaracteristicaProps {
  nome: string;
  descricao: string;
}

export default function Caracteristica({ nome, descricao }: CaracteristicaProps) {
  return (
    <div
      className="
        bg-slate-800 text-white
        p-4 rounded-xl m-2
        w-64 h-40
        flex flex-col justify-between
        hover:bg-slate-700 transition
      "
    >
      <h2 className="text-xl font-bold">{nome}</h2>
      <p className="text-sm opacity-80">{descricao}</p>

      <Link
        href={`/caracteristicas/${nome}`}
        className="text-blue-400 underline mt-2"
      > Ver detalhes</Link>
    </div>
  );
}