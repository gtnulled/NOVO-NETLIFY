"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "./supabaseClient"

export function useUser() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user
      setUser(currentUser ?? null)

      if (event === "SIGNED_IN" && currentUser) {
        const { data: profile } = await supabase.from("users").select("*").eq("id", currentUser.id).single()

        if (profile) {
          setUser({ ...currentUser, ...profile })
          if (profile.role === "admin") {
            router.push("/admin")
          }
        }
      }

      if (event === "SIGNED_OUT") {
        setUser(null)
        router.push("/")
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router]) // Added router to dependencies

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, signOut }
}

