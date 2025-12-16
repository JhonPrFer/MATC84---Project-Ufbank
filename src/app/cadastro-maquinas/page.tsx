import PaymentMachineRegistrationForm from '@/components/organisms/PaymentMachineRegistrationForm'
import MachinesList from '@/components/organisms/MachinesList'

export default function CadastroMaquinasPage() {
  return (
    <main className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <PaymentMachineRegistrationForm />
        <MachinesList />
      </div>
    </main>
  )
}
