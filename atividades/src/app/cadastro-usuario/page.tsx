import { CustomPage as Page } from "@/src/components/page/page";
import UserForm from "@/src/components/UserForm";

export default function register() {
  return (
    <Page title="Cadastrar Usuário">
      <UserForm />
    </Page>
  );
}
