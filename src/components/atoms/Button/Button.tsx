import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}) => {
  const baseClasses = 'w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: disabled
      ? 'bg-gray-400 cursor-not-allowed text-white border-transparent'
      : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent focus:ring-indigo-500',
    secondary: disabled
      ? 'bg-gray-100 cursor-not-allowed text-gray-400 border-gray-200'
      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-gray-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;