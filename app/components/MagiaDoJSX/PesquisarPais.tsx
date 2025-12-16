"use client";


interface PesquisarPaisProps {
    pesquisa: string;
    setPesquisa: (value: string) => void;
}

export default function PesquisarProdutos({ pesquisa, setPesquisa }: PesquisarPaisProps) {

    return (
        <input
            value={pesquisa}
            onChange={(evento) => setPesquisa(evento.target.value)}
            placeholder="Pesquisar produtos"
        />

    )
}