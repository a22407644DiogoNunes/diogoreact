import { headers } from 'next/headers'
import Link from 'next/link'

interface Projeto {nome: string; url: string}

export default function ProjetosPage() {
    return (
        <>
            <header className="flex flex-col items-center">
                <h1>React & Next.js</h1>
                <nav className="flex gap-4">
                    <Link href="/">Intro</Link>
                    <Link href="/sobre">Sobre</Link>
                    <Link href="/caracteristicas">Caracteristicas</Link>
                    <Link href="/tecnologias">Tecnologias</Link>
                    <Link href="/projetos">Projetos</Link>
                </nav>
            </header>
            <DescricaoProjetos />
        </>
    )
}

function DescricaoProjetos() {
    return (
        <section>
            <h2>Meus Projetos</h2>
            <p>Já desenvolvi vários projetos que demonstram o que aprendi até agora. Confira todos eles no meu <a href="https://github.com/a22407644DiogoNunes/a22407644DiogoNunes.github.io.git" target="_blank">GitHub Pages</a>.</p>
            <Projeto nome="Loja Online" url="https://bookish-space-capybara-wrx9rpwjjrwrcgqjg-3000.app.github.dev/Lab7/index.html" />
            <Projeto nome="Site com JS Interativo" url="https://bookish-space-capybara-wrx9rpwjjrwrcgqjg-3000.app.github.dev/Lab3/index.html" />
        </section>
    )
}

function Projeto(props: Projeto) {
    return (
        <p>
            Projeto: <strong>{props.nome}</strong> - Acesse <a href={props.url} target="_blank">aqui</a>.
        </p>
    )
}