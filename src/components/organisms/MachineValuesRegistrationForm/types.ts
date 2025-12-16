export type PaymentMethod = 'credit' | 'debit' | 'pix';

export interface MachineValueData {
  paymentMethod: PaymentMethod;
  installments: string;
  feePercentage: string;
  dailyLimit: string;
  monthlyLimit: string;
}

export interface MachineValuesRegistrationFormProps {
  onSubmit?: (data: MachineValueData) => Promise<void>;
  initialData?: Partial<MachineValueData>;
}
