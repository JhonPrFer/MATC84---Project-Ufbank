import { Link } from "@mui/material";

export const Header = () => {
  return (
    <header className="w-full flex bg-cyan-100 gap-2 p-4">
      <Link  href="/cadastro-usuario" variant="h6">Cadastrar Usuário</Link>
      <Link href="/cadastro-maquina" variant="h6">Cadastrar Máquina de Pagamento</Link>
      <Link href="/cadastro-valores" variant="h6">Cadastrar Valores das Máquinas</Link>
    </header>
  );
};
