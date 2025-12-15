import type { Metadata } from "next"
import React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "UFBa-BANK - Banco Digital da UFBA",
  description:
    "Sistema bancário digital da Universidade Federal da Bahia. Gerencie suas finanças com segurança e praticidade.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
