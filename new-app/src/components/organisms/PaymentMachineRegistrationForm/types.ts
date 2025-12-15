export type MachineStatus = 'active' | 'inactive' | 'maintenance' | 'retired';

export interface PaymentMachineData {
  serialNumber: string;
  model: string;
  manufacturer: string;
  status: MachineStatus;
  transactionFeePercentage: string;
  installationDate: string;
  location: string;
}

export interface PaymentMachineRegistrationFormProps {
  onSubmit?: (data: PaymentMachineData) => Promise<void>;
  initialData?: Partial<PaymentMachineData>;
}
