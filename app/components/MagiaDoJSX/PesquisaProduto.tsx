"use client";


interface PesquisarProdutosProps {
    pesquisa: string;
    setPesquisa: (value: string) => void;
}

export default function PesquisarProdutos({ pesquisa, setPesquisa }: PesquisarProdutosProps) {

    return (
        <input
            value={pesquisa}
            onChange={(evento) => setPesquisa(evento.target.value)}
            placeholder="Pesquisar produtos"
        />

    )
}