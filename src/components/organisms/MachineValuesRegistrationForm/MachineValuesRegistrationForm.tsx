"use client"

import React, { useState, useEffect } from 'react';
import FormField from '../../molecules/FormField/FormField';
import SelectField from '../../molecules/SelectField/SelectField';
import Button from '../../atoms/Button/Button';
import { logger } from '../../../lib/logger';
import { MachineValueData, MachineValuesRegistrationFormProps } from './types';
import { PAYMENT_METHOD_OPTIONS, INSTALLMENTS_OPTIONS, INITIAL_FORM_STATE } from './constants';
import { PaymentMachineData } from '../PaymentMachineRegistrationForm/types';

const validateForm = (data: MachineValueData): string | null => {
  const fee = parseFloat(data.feePercentage);
  if (isNaN(fee) || fee < 0 || fee > 100) {
    return 'Taxa deve estar entre 0 e 100';
  }

  const dailyLimit = parseFloat(data.dailyLimit);
  if (isNaN(dailyLimit) || dailyLimit <= 0) {
    return 'Limite diário deve ser maior que 0';
  }

  const monthlyLimit = parseFloat(data.monthlyLimit);
  if (isNaN(monthlyLimit) || monthlyLimit <= 0) {
    return 'Limite mensal deve ser maior que 0';
  }

  if (dailyLimit > monthlyLimit) {
    return 'Limite diário não pode ser maior que o mensal';
  }

  return null;
};

const MachineValuesRegistrationForm: React.FC<MachineValuesRegistrationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [registeredMachine, setRegisteredMachine] = useState<PaymentMachineData | null>(null);
  const [formData, setFormData] = useState<MachineValueData>({
    ...INITIAL_FORM_STATE,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const machineData = localStorage.getItem('registeredMachine');
    if (!machineData) {
      setError('Nenhuma máquina cadastrada. Por favor, cadastre uma máquina primeiro.');
      return;
    }

    try {
      const machine: PaymentMachineData = JSON.parse(machineData);
      setRegisteredMachine(machine);
    } catch (err) {
      setError('Erro ao carregar dados da máquina.');
      logger.error('Failed to parse machine data', {
        component: 'MachineValuesRegistrationForm',
        action: 'useEffect',
        metadata: { error: err instanceof Error ? err.message : 'Unknown error' },
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    logger.info('Form submission started', {
      component: 'MachineValuesRegistrationForm',
      action: 'handleSubmit',
      metadata: { paymentMethod: formData.paymentMethod },
    });

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      logger.warn('Validation failed', {
        component: 'MachineValuesRegistrationForm',
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

        // Salvar os valores no localStorage
        const existingValues = localStorage.getItem('machineValues');
        const valuesArray = existingValues ? JSON.parse(existingValues) : [];
        valuesArray.push({
          ...formData,
          machineSerialNumber: registeredMachine?.serialNumber,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('machineValues', JSON.stringify(valuesArray));

        console.log('Valores cadastrados (mock):', formData);
        alert(`Valores cadastrados com sucesso!`);
      }

      logger.info('Form submission succeeded', {
        component: 'MachineValuesRegistrationForm',
        action: 'handleSubmit',
        metadata: { paymentMethod: formData.paymentMethod },
      });

      setFormData(INITIAL_FORM_STATE);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      logger.error('Form submission failed', {
        component: 'MachineValuesRegistrationForm',
        action: 'handleSubmit',
        metadata: { error: errorMessage },
      });
    } finally {
      setLoading(false);
    }
  };

  if (!registeredMachine) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          {error || 'Carregando...'}
        </div>
      </div>
    );
  }

  const isFormValid =
    formData.feePercentage.trim() !== '' &&
    formData.dailyLimit.trim() !== '' &&
    formData.monthlyLimit.trim() !== '';

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Máquina Cadastrada
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Número de Série:</span>
            <p className="text-gray-900">{registeredMachine.serialNumber}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Modelo:</span>
            <p className="text-gray-900">{registeredMachine.model}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Fabricante:</span>
            <p className="text-gray-900">{registeredMachine.manufacturer}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <p className="text-gray-900">{registeredMachine.status}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Cadastrar Valores da Máquina
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <SelectField
          label="Método de Pagamento"
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          options={PAYMENT_METHOD_OPTIONS}
          required
        />

        <SelectField
          label="Parcelas"
          id="installments"
          name="installments"
          value={formData.installments}
          onChange={handleChange}
          options={INSTALLMENTS_OPTIONS}
          required
        />

        <FormField
          label="Taxa (%)"
          id="feePercentage"
          name="feePercentage"
          type="text"
          value={formData.feePercentage}
          onChange={handleChange}
          placeholder="Ex: 2.5"
          required
        />

        <FormField
          label="Limite Diário (R$)"
          id="dailyLimit"
          name="dailyLimit"
          type="text"
          value={formData.dailyLimit}
          onChange={handleChange}
          placeholder="Ex: 5000.00"
          required
        />

        <FormField
          label="Limite Mensal (R$)"
          id="monthlyLimit"
          name="monthlyLimit"
          type="text"
          value={formData.monthlyLimit}
          onChange={handleChange}
          placeholder="Ex: 150000.00"
          required
        />

        <div>
          <Button type="submit" disabled={!isFormValid || loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Valores'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MachineValuesRegistrationForm;
