import { MachineValueData, PaymentMethod } from './types';
import { SelectOption } from '../../atoms/Select/Select';

export const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { value: 'credit', label: 'Crédito' },
  { value: 'debit', label: 'Débito' },
  { value: 'pix', label: 'PIX' },
];

export const INSTALLMENTS_OPTIONS: SelectOption[] = [
  { value: '1', label: '1x' },
  { value: '2', label: '2x' },
  { value: '3', label: '3x' },
  { value: '4', label: '4x' },
  { value: '5', label: '5x' },
  { value: '6', label: '6x' },
  { value: '7', label: '7x' },
  { value: '8', label: '8x' },
  { value: '9', label: '9x' },
  { value: '10', label: '10x' },
  { value: '11', label: '11x' },
  { value: '12', label: '12x' },
];

export const INITIAL_FORM_STATE: MachineValueData = {
  paymentMethod: 'credit' as PaymentMethod,
  installments: '1',
  feePercentage: '',
  dailyLimit: '',
  monthlyLimit: '',
};
