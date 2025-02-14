"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { supabase } from "../../utils/supabaseClient"
import { useUser } from "../../utils/useUser"
import { useRouter } from "next/router"

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/")
    } else {
      fetchUsers()
    }
  }, [user, router]) // Added router to dependencies

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (userId) => {
    try {
      const { error } = await supabase.from("users").update({ verificado: true }).eq("id", userId)

      if (error) throw error

      fetchUsers()
    } catch (error) {
      console.error("Error verifying user:", error)
    }
  }

  const handleDelete = async (userId) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const { error } = await supabase.from("users").delete().eq("id", userId)

        if (error) throw error

        fetchUsers()
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  const handleToggleAdmin = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin"
    try {
      const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId)

      if (error) throw error

      fetchUsers()
    } catch (error) {
      console.error("Error updating user role:", error)
    }
  }

  if (loading) {
    return <Layout>Carregando...</Layout>
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-burgundy-900 mb-6">Painel de Administração</h1>
        <table className="w-full">
          <thead>
            <tr className="bg-burgundy-900 text-white">
              <th className="p-2">Nome</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">Grau de Ordem</th>
              <th className="p-2">Verificado</th>
              <th className="p-2">Papel</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.nome_completo}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.grau_ordem}</td>
                <td className="p-2">{user.verificado ? "Sim" : "Não"}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  {!user.verificado && (
                    <button
                      onClick={() => handleVerify(user.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Verificar
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleAdmin(user.id, user.role)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    {user.role === "admin" ? "Remover Admin" : "Tornar Admin"}
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

