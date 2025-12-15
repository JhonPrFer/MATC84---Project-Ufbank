import React from 'react';

type InputType = 'text' | 'email' | 'password' | 'date' | 'tel';

interface InputProps {
  label: string;
  id: string;
  name: string;
  type: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-2">
        {label}
        {required && <span className="text-[var(--ufba-yellow)] ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-[var(--ufba-gray-dark)] border border-[var(--ufba-gray)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--ufba-yellow)] focus:ring-2 focus:ring-[var(--ufba-yellow)]/20 transition-all duration-200"
      />
    </div>
  );
};

export default Input;