"use client"

import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { UserData } from '../../../types/user';

const initialFormState: UserData = {
  name: '',
  email: '',
  cpf: '',
  cellphoneNumber: '',
  birthday: '',
  password: '',
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserData>(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = value.replace(/\D/g, '').slice(0, 11);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Enviando dados:', formData);

    setTimeout(() => {
      console.log('✅ Cadastro realizado com sucesso');
      alert(`Usuário cadastrado com sucesso! Bem-vindo ao UFBa-BANK, ${formData.name}!`);
      setFormData(initialFormState);
      setLoading(false);
    }, 1500);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-8 bg-[var(--ufba-black)] rounded-2xl border border-[var(--ufba-gray-dark)] max-w-md w-full"
      style={{ boxShadow: 'var(--shadow-yellow)' }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--ufba-yellow)] mb-2">
          Criar Conta
        </h2>
        <p className="text-sm text-gray-400">
          Preencha os dados para abrir sua conta no UFBa-BANK
        </p>
      </div>

      <FormField
        label="Nome Completo"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <FormField
        label="E-mail"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormField
        label="CPF"
        id="cpf"
        name="cpf"
        type="text"
        value={formData.cpf}
        onChange={handleChange}
        placeholder="000.000.000-00"
        required
      />

      <FormField
        label="Número de Celular"
        id="cellphoneNumber"
        name="cellphoneNumber"
        type="tel"
        value={formData.cellphoneNumber}
        onChange={handleChange}
        placeholder="(00) 00000-0000"
        required
      />

      <FormField
        label="Data de Nascimento"
        id="birthday"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
      />

      <FormField
        label="Senha"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="pt-4">
        <Button type="submit" onClick={() => {}} disabled={!isFormValid || loading}>
          {loading ? 'Cadastrando...' : 'Criar Conta'}
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        Ao criar uma conta, você concorda com os{' '}
        <span className="text-[var(--ufba-yellow)] hover:underline cursor-pointer">
          Termos de Uso
        </span>
      </p>
    </form>
  );
};

export default RegistrationForm;