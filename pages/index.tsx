"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { supabase } from "../utils/supabaseClient"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchUsers()
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const searchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, nome_completo, grau_ordem, diocese")
      .or(`nome_completo.ilike.%${searchTerm}%, diocese.ilike.%${searchTerm}%, grau_ordem.ilike.%${searchTerm}%`)
      .eq("verificado", true)
      .limit(5)

    if (error) {
      console.error("Error searching users:", error)
    } else {
      setSearchResults(data)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] bg-beige-100">
        <h1 className="text-4xl font-serif text-burgundy-900 mb-8">Cadastro Regional de Presbíteros</h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar por nome, diocese ou grau de ordem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-900"
          />
          {searchResults.length > 0 && (
            <div className="mt-4 bg-white border border-gold-300 rounded-lg shadow-lg">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => router.push(`/perfil/${user.id}`)}
                  className="p-4 hover:bg-beige-100 cursor-pointer border-b border-gold-300 last:border-b-0"
                >
                  <p className="text-burgundy-900 font-semibold">{user.nome_completo}</p>
                  <p className="text-sm text-gray-600">
                    {user.grau_ordem} - {user.diocese}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
