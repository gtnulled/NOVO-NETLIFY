"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { supabase } from "../utils/supabaseClient"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const { data: profile } = await supabase.from("users").select("*").eq("id", data.user.id).single()

      if (profile.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      alert("Erro ao fazer login: " + error.message)
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-burgundy-900 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-900 focus:ring focus:ring-burgundy-900 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-burgundy-900 text-white py-2 px-4 rounded-md hover:bg-burgundy-800 focus:outline-none focus:ring-2 focus:ring-burgundy-900 focus:ring-opacity-50"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

