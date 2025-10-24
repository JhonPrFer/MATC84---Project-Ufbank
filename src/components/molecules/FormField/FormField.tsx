import React from 'react';
import Input from '../../atoms/Input/Input';

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'tel';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  error,
  ...inputProps
}) => {
  return (
    <div>
      <Input {...inputProps} />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default FormField;