import React from "react"
import RegistrationForm from "../../components/organisms/RegistrationForm/RegistrationForm"

/**
 * A simple page that uses the RegistrationForm Organism.
 * This acts as the Template and Page level in Atomic Design,
 * providing context and layout for the organism.
 */
const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <RegistrationForm />
    </div>
  )
}

export default RegisterPage
