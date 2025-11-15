import Link from "next/link";

export default function Page() {
    return (
        
        <>
        <header className="flex flex-col items-center">
            <h1>React & Next.js</h1>
            <nav className="flex gap-4">
                <Link href="/">Intro</Link>
                <Link href="/sobre">Sobre</Link>
            </nav>
        </header>
        <h2>Desenvolvimento Web Moderno</h2>
        <ul>
            <li>React e Next.js revolucionaram a criação de interfaces web.</li>
            <li>São usados por empresas como Facebook, Netflix e Airbnb.</li>
            <li>Dominar estas tecnologias abre muitas oportunidades!</li>
        </ul>
        </>
    )
}