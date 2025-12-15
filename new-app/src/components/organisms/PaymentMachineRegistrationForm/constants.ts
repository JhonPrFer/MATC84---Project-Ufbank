import { PaymentMachineData, MachineStatus } from './types';
import { SelectOption } from '../../atoms/Select/Select';

export const MACHINE_STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'maintenance', label: 'Em Manutenção' },
  { value: 'retired', label: 'Desativado' },
];

export const INITIAL_FORM_STATE: PaymentMachineData = {
  serialNumber: '',
  model: '',
  manufacturer: '',
  status: 'inactive' as MachineStatus,
  transactionFeePercentage: '',
  installationDate: '',
  location: '',
};
