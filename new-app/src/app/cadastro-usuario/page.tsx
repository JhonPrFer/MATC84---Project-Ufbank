import { CustomPage as Page } from "@/components/joao/page/page";
import UserForm from "@/components/joao/UserForm";

export default function register() {
  return (
    <Page title="Cadastrar Usuário">
      <UserForm />
    </Page>
  );
}
