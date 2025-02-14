"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Layout from "../../components/Layout"
import { supabase } from "../../utils/supabaseClient"
import { getPublicUrl } from "../../utils/fileUpload"

export default function Perfil() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [id])

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

      if (error) throw error

      setUser(data)
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Layout>Carregando...</Layout>
  }

  if (!user) {
    return <Layout>Usuário não encontrado</Layout>
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          {user.foto ? (
            <Image
              src={getPublicUrl(user.foto) || "/placeholder.svg"}
              alt={user.nome_completo}
              width={100}
              height={100}
              className="rounded-full mr-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
          )}
          <div>
            <h1 className="text-3xl font-serif text-burgundy-900">
              {user.nome_completo}
              {user.verificado && (
                <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                  Religioso Verificado
                </span>
              )}
            </h1>
            <p className="text-gray-600">{user.grau_ordem}</p>
          </div>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Diocese:</strong> {user.diocese}
          </p>
          <p>
            <strong>Ocupação Canônica:</strong> {user.ocupacao_canonica}
          </p>
          <p>
            <strong>Data de Ordenação:</strong> {user.data_ordenacao}
          </p>
          <p>
            <strong>Bispo Ordenante:</strong> {user.bispo_ordenante}
          </p>
          {user.facebook && (
            <p>
              <strong>Facebook:</strong>{" "}
              <a
                href={`https://facebook.com/${user.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.facebook}
              </a>
            </p>
          )}
          {user.instagram && (
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href={`https://instagram.com/${user.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                @{user.instagram}
              </a>
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}

