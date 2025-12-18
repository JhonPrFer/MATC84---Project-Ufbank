"use client"

import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import SelectField from '../../molecules/SelectField/SelectField';
import Button from '../../atoms/Button/Button';
import { logger } from '../../../lib/logger';
import { PaymentMachineData, PaymentMachineRegistrationFormProps } from './types';
import { MACHINE_STATUS_OPTIONS, INITIAL_FORM_STATE } from './constants';

const validateForm = (data: PaymentMachineData): string | null => {
  if (!data.serialNumber.trim()) return 'Número de série é obrigatório';
  if (!data.model.trim()) return 'Modelo é obrigatório';
  if (!data.manufacturer.trim()) return 'Fabricante é obrigatório';

  const fee = parseFloat(data.transactionFeePercentage);
  if (isNaN(fee) || fee < 0 || fee > 100) {
    return 'Taxa de transação deve estar entre 0 e 100';
  }

  return null;
};

const PaymentMachineRegistrationForm: React.FC<PaymentMachineRegistrationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<PaymentMachineData>({
    ...INITIAL_FORM_STATE,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    logger.info('Form submission started', {
      component: 'PaymentMachineRegistrationForm',
      action: 'handleSubmit',
      metadata: { serialNumber: formData.serialNumber },
    });

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      logger.warn('Validation failed', {
        component: 'PaymentMachineRegistrationForm',
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
        console.log('Máquina cadastrada (mock):', formData);

        // Salvar no localStorage
        localStorage.setItem('registeredMachine', JSON.stringify(formData));

        alert(`Máquina cadastrada: ${JSON.stringify(formData, null, 2)}`);
      }

      logger.info('Form submission succeeded', {
        component: 'PaymentMachineRegistrationForm',
        action: 'handleSubmit',
        metadata: { serialNumber: formData.serialNumber },
      });

      setFormData(INITIAL_FORM_STATE);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      logger.error('Form submission failed', {
        component: 'PaymentMachineRegistrationForm',
        action: 'handleSubmit',
        metadata: { error: errorMessage },
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.serialNumber.trim() !== '' &&
    formData.model.trim() !== '' &&
    formData.manufacturer.trim() !== '' &&
    formData.transactionFeePercentage.trim() !== '';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Cadastrar Máquina de Pagamento
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <FormField
        label="Número de Série"
        id="serialNumber"
        name="serialNumber"
        type="text"
        value={formData.serialNumber}
        onChange={handleChange}
        placeholder="Ex: SN-2024-001234"
        required
      />

      <FormField
        label="Modelo"
        id="model"
        name="model"
        type="text"
        value={formData.model}
        onChange={handleChange}
        placeholder="Ex: Ingenico Move 5000"
        required
      />

      <FormField
        label="Fabricante"
        id="manufacturer"
        name="manufacturer"
        type="text"
        value={formData.manufacturer}
        onChange={handleChange}
        placeholder="Ex: Ingenico, PagSeguro"
        required
      />

      <SelectField
        label="Status"
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={MACHINE_STATUS_OPTIONS}
        required
      />

      <FormField
        label="Taxa de Transação (%)"
        id="transactionFeePercentage"
        name="transactionFeePercentage"
        type="text"
        value={formData.transactionFeePercentage}
        onChange={handleChange}
        placeholder="Ex: 2.5"
        required
      />


      <div>
        <Button type="submit" disabled={!isFormValid || loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Máquina'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentMachineRegistrationForm;
