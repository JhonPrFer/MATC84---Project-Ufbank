"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../atoms/Button/Button';
import { PaymentMachineData } from '../PaymentMachineRegistrationForm/types';
import { logger } from '../../../lib/logger';

const MachinesList: React.FC = () => {
  const router = useRouter();
  const [machines, setMachines] = useState<PaymentMachineData[]>([]);

  useEffect(() => {
    const machineData = localStorage.getItem('registeredMachine');
    if (machineData) {
      try {
        const machine: PaymentMachineData = JSON.parse(machineData);
        setMachines([machine]);
      } catch (err) {
        logger.error('Failed to parse machine data', {
          component: 'MachinesList',
          action: 'useEffect',
          metadata: { error: err instanceof Error ? err.message : 'Unknown error' },
        });
      }
    }
  }, []);

  if (machines.length === 0) {
    return null;
  }

  const handleNavigateToValues = () => {
    router.push('/cadastro-valores-maquinas');
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'Ativo',
      inactive: 'Inativo',
      maintenance: 'Em Manutenção',
      retired: 'Desativado',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      retired: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Máquinas Cadastradas
      </h3>

      <div className="space-y-4">
        {machines.map((machine, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{machine.model}</h4>
                <p className="text-sm text-gray-600">{machine.manufacturer}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(machine.status)}`}
              >
                {getStatusLabel(machine.status)}
              </span>
            </div>

            <div className="space-y-1 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Série:</span>
                <span className="font-medium text-gray-900">{machine.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa:</span>
                <span className="font-medium text-gray-900">{machine.transactionFeePercentage}%</span>
              </div>
              {machine.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Local:</span>
                  <span className="font-medium text-gray-900">{machine.location}</span>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              onClick={handleNavigateToValues}
            >
              Cadastrar Valores
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesList;
