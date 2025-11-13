import React from 'react';
import Input from '../../atoms/Input/Input';

// Re-using the InputProps interface for consistency
interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'tel';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Add an error prop for validation
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  error, // We can display the error here
  ...inputProps // Pass all other props directly to Input
}) => {
  return (
    <div>
      <Input {...inputProps} />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default FormField;