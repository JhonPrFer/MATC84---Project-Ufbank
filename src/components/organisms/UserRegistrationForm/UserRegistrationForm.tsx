"use client"

import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { logger } from '../../../lib/logger';
import { UserRegistrationData, UserRegistrationFormProps } from './types';

const INITIAL_STATE: UserRegistrationData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const validateForm = (data: UserRegistrationData): string | null => {
  if (!data.email.trim()) return 'Email é obrigatório';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Formato de email inválido';
  if (!data.password) return 'Senha é obrigatória';
  if (data.password.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
  if (data.password !== data.confirmPassword) return 'As senhas não coincidem';
  return null;
};

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<UserRegistrationData>({
    ...INITIAL_STATE,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    logger.info('User registration started', {
      component: 'UserRegistrationForm',
      action: 'handleSubmit',
      metadata: { email: formData.email },
    });

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      logger.warn('Validation failed', {
        component: 'UserRegistrationForm',
        action: 'validation',
        metadata: { error: validationError },
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Usuário cadastrado (mock):', { email: formData.email });
        alert(`Usuário cadastrado: ${formData.email}`);
      }

      logger.info('User registration succeeded', {
        component: 'UserRegistrationForm',
        action: 'handleSubmit',
        metadata: { email: formData.email },
      });

      setFormData(INITIAL_STATE);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      logger.error('User registration failed', {
        component: 'UserRegistrationForm',
        action: 'handleSubmit',
        metadata: { error: errorMessage },
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Cadastrar Usuário
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <FormField
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="usuario@exemplo.com"
        required
      />

      <div className="relative">
        <FormField
          label="Senha"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Mín. 6 caracteres"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <div className="relative">
        <FormField
          label="Confirmar Senha"
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repita sua senha"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showConfirmPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <div className="flex justify-between gap-4">
        <Button type="button" variant="secondary" onClick={handleReset}>
          Apagar
        </Button>
        <Button type="submit" disabled={!isFormValid || loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default UserRegistrationForm;
