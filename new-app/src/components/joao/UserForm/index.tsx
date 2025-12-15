"use client";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { CustomButton as Button } from "../Button";

const UserForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Record<string, string>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = (data: Record<string, string>) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        label="Email"
        fullWidth
        required
        register={register}
      />
      <Input
        name="password"
        label="Senha"
        type="password"
        fullWidth
        required
        register={register}
      />
      <Input
        name="confirmPassword"
        label="Confirmar senha"
        type="password"
        fullWidth
        required
        register={register}
      />

      <div className="flex justify-between">
        <div className="">
          <Button label="Apagar" type="reset" color="error" />
        </div>

        <div className="">
          <Button label="Cadastrar" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default UserForm;
