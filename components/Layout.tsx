import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUser } from "../utils/useUser"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const { user, signOut } = useUser()

  return (
    <div className="min-h-screen flex flex-col bg-beige-100">
      <header className="bg-burgundy-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif">
            Cadastro Regional de Presbíteros
          </Link>
          <nav>
            {user ? (
              <>
                <Link href="/perfil" className="text-white hover:text-gold-300 ml-4">
                  Meu Perfil
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-white hover:text-gold-300 ml-4">
                    Painel Admin
                  </Link>
                )}
                <button onClick={signOut} className="text-white hover:text-gold-300 ml-4">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-gold-300 ml-4">
                  Login
                </Link>
                <Link href="/cadastro" className="text-white hover:text-gold-300 ml-4">
                  Cadastre-se
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {router.pathname !== "/" && (
          <button onClick={() => router.back()} className="mb-4 text-burgundy-900 hover:text-gold-300">
            ← Voltar
          </button>
        )}
        {children}
      </main>
      <footer className="bg-burgundy-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/termos-de-uso" className="text-white hover:text-gold-300 mr-4">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="text-white hover:text-gold-300">
              Política de Privacidade
            </Link>
          </div>
          <a href="mailto:guthierresc@hotmail.com" className="text-white hover:text-gold-300">
            Contato
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout

