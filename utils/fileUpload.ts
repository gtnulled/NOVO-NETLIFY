import { supabase } from "./supabaseClient"

export async function uploadFile(file: File, folder: string): Promise<string> {
  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await supabase.storage.from("uploads").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (uploadError) {
    console.error("Error uploading file:", uploadError)
    throw uploadError
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(filePath)

  if (!data.publicUrl) {
    throw new Error("Failed to get public URL")
  }

  return filePath
}

export function getPublicUrl(path: string | null): string | null {
  if (!path) return null
  const { data } = supabase.storage.from("uploads").getPublicUrl(path)
  return data.publicUrl
}

