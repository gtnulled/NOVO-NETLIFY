"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Layout from "../../components/Layout"
import { supabase } from "../../utils/supabaseClient"
import { useUser } from "../../utils/useUser"
import { uploadFile, getPublicUrl } from "../../utils/fileUpload"

export default function Perfil() {
  const { user } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [foto, setFoto] = useState<File | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      router.push("/login")
    }
  }, [user, router])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (error) throw error

      setFormData(data)
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 300 * 1024) {
      setFoto(file)
    } else {
      alert("A foto deve ter no máximo 300KB")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let fotoPath = formData.foto
      if (foto) {
        fotoPath = await uploadFile(foto, "profile-photos")
      }

      const { error } = await supabase
        .from("users")
        .update({ ...formData, foto: fotoPath })
        .eq("id", user.id)

      if (error) throw error

      alert("Perfil atualizado com sucesso!")
      fetchUserData()
    } catch (error) {
      alert("Erro ao atualizar perfil: " + error.message)
    }
  }

  if (loading) {
    return <Layout>Carregando...</Layout>
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-burgundy-900 mb-6">Meu Perfil</h1>
        {formData.foto && (
          <div className="mb-4">
            <Image
              src={getPublicUrl(formData.foto) || "/placeholder.svg"}
              alt="Foto de perfil"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome_completo"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="grau_ordem" className="block text-sm font-medium text-gray-700">
              Grau de Ordem
            </label>
            <select
              id="grau_ordem"
              name="grau_ordem"
              value={formData.grau_ordem}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              <option value="Diácono">Diácono</option>
              <option value="Padre">Padre</option>
              <option value="Bispo">Bispo</option>
            </select>
          </div>
          <div>
            <label htmlFor="diocese" className="block text-sm font-medium text-gray-700">
              Diocese
            </label>
            <input
              type="text"
              id="diocese"
              name="diocese"
              value={formData.diocese}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="ocupacao_canonica" className="block text-sm font-medium text-gray-700">
              Ocupação Canônica
            </label>
            <select
              id="ocupacao_canonica"
              name="ocupacao_canonica"
              value={formData.ocupacao_canonica}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              <option value="Vigário">Vigário</option>
              <option value="Pároco">Pároco</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Titular">Titular</option>
            </select>
          </div>
          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
              Atualizar Foto de Perfil (máx. 300KB)
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-burgundy-900 text-white py-2 px-4 rounded-md hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              Atualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

