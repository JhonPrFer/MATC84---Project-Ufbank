import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8'>
      <div className='text-center max-w-2xl'>
        <div className='w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center'>
          <span className='text-3xl font-bold text-slate-900'>UF</span>
        </div>
        <h1 className='text-5xl font-bold mb-4'>UFBANK</h1>
        <p className='text-xl text-slate-300 mb-8'>
          Banco Digital Universitário da UFBA
        </p>
        <div className='flex flex-wrap gap-4 justify-center'>
          <Link
            href='/cadastro-usuario'
            className='px-8 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors'
          >
            Cadastrar Usuário
          </Link>
          <Link
            href='/cadastro-maquinas'
            className='px-8 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20'
          >
            Cadastrar Máquina
          </Link>
        </div>
      </div>
    </div>
  )
}
