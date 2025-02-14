"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { supabase } from "../utils/supabaseClient"
import { uploadFile } from "../utils/fileUpload"

export default function Cadastro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome_completo: "",
    grau_ordem: "",
    bispo_ordenante: "",
    data_ordenacao: "",
    diocese: "",
    ocupacao_canonica: "",
    carteira_cnbb: "",
    facebook: "",
    instagram: "",
    email: "",
    telefone: "",
    senha: "",
    confirme_senha: "",
  })
  const [foto, setFoto] = useState<File | null>(null)

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
    if (formData.senha !== formData.confirme_senha) {
      alert("As senhas não coincidem")
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
      })

      if (error) throw error

      let fotoPath = null
      if (foto) {
        fotoPath = await uploadFile(foto, "profile-photos")
      }

      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          ...formData,
          foto: fotoPath,
          role: "user",
          verificado: false,
        },
      ])

      if (profileError) throw profileError

      alert("Cadastro realizado com sucesso! Aguarde a verificação do administrador.")
      router.push("/")
    } catch (error) {
      alert("Erro ao realizar cadastro: " + error.message)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-burgundy-900 mb-6">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome_completo"
              name="nome_completo"
              required
              value={formData.nome_completo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="grau_ordem" className="block text-sm font-medium text-gray-700">
              Grau de Ordem *
            </label>
            <select
              id="grau_ordem"
              name="grau_ordem"
              required
              value={formData.grau_ordem}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              <option value="">Selecione</option>
              <option value="Diácono">Diácono</option>
              <option value="Padre">Padre</option>
              <option value="Bispo">Bispo</option>
            </select>
          </div>
          <div>
            <label htmlFor="bispo_ordenante" className="block text-sm font-medium text-gray-700">
              Bispo Ordenante
            </label>
            <input
              type="text"
              id="bispo_ordenante"
              name="bispo_ordenante"
              value={formData.bispo_ordenante}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="data_ordenacao" className="block text-sm font-medium text-gray-700">
              Data de Ordenação
            </label>
            <input
              type="date"
              id="data_ordenacao"
              name="data_ordenacao"
              value={formData.data_ordenacao}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
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
              <option value="">Selecione</option>
              <option value="Vigário">Vigário</option>
              <option value="Pároco">Pároco</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Titular">Titular</option>
            </select>
          </div>
          <div>
            <label htmlFor="carteira_cnbb" className="block text-sm font-medium text-gray-700">
              Nº carteira CNBB
            </label>
            <input
              type="text"
              id="carteira_cnbb"
              name="carteira_cnbb"
              value={formData.carteira_cnbb}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
              Facebook (apenas o usuário)
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram (apenas o usuário)
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
              Foto de Perfil (máx. 300KB)
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
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha *
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="confirme_senha" className="block text-sm font-medium text-gray-700">
              Confirme a Senha *
            </label>
            <input
              type="password"
              id="confirme_senha"
              name="confirme_senha"
              required
              value={formData.confirme_senha}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-burgundy-900 text-white py-2 px-4 rounded-md hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

