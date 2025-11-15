import MagiaDoJSX from '@/components/MagiaDoJSX/MagiaDoJSX'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <h2>Interfaces Modernos</h2>
      <p>Bem vindo à minha app em React e Next.js.</p>
      <MagiaDoJSX />
      <nav className="mt-6">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-yellow-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:text-yellow-400">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/características" className="hover:text-yellow-400">
              Características
            </Link>
          </li>
          <li>
            <Link href="/tecnologias" className="hover:text-yellow-400">
              Tecnologias
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}