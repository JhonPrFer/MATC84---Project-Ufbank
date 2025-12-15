import React from "react"
import RegistrationForm from "../components/organisms/RegistrationForm/RegistrationForm"

function LogoHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center border-b border-[var(--ufba-gray-dark)]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[var(--ufba-yellow)] rounded-lg flex items-center justify-center font-bold text-2xl text-black">
          UF
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--ufba-yellow)]">UFBa-BANK</h1>
          <p className="text-xs text-gray-400">Banco Digital da UFBA</p>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-xl">
      <h2 className="text-5xl font-bold mb-6 leading-tight">
        Bem-vindo ao
        <span className="block text-[var(--ufba-yellow)] mt-2">
          UFBa-BANK
        </span>
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        O banco digital da Universidade Federal da Bahia.
        Gerencie suas finanças com segurança, praticidade e tecnologia de ponta.
      </p>
      <div className="flex gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--ufba-gray-dark)] flex items-center justify-center text-[var(--ufba-yellow)]">
            ✓
          </div>
          <span className="text-sm text-gray-300">100% Seguro</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--ufba-gray-dark)] flex items-center justify-center text-[var(--ufba-yellow)]">
            ✓
          </div>
          <span className="text-sm text-gray-300">Gratuito</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--ufba-gray-dark)] flex items-center justify-center text-[var(--ufba-yellow)]">
            ✓
          </div>
          <span className="text-sm text-gray-300">Rápido</span>
        </div>
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      <LogoHeader />

      <div className="min-h-screen flex items-stretch pt-24">
        <HeroSection />

        <div className="flex-1 flex items-center justify-center p-12 bg-[var(--ufba-black-light)] border-l border-[var(--ufba-gray-dark)]">
          <RegistrationForm />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--ufba-yellow-dark)] via-[var(--ufba-yellow)] to-[var(--ufba-yellow-light)]" />
    </div>
  )
}

export default HomePage
