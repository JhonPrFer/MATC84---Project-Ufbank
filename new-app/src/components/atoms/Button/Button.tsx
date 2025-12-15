import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex justify-center py-3 px-6 rounded-lg text-base font-semibold transition-all duration-200 ${
        disabled
          ? 'bg-[var(--ufba-gray)] text-gray-500 cursor-not-allowed'
          : 'bg-[var(--ufba-yellow)] text-black hover:bg-[var(--ufba-yellow-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--ufba-yellow)] focus:ring-offset-2 focus:ring-offset-[var(--ufba-black)]'
      }`}
      style={
        disabled
          ? {}
          : {
              boxShadow: 'var(--shadow-yellow)',
            }
      }
    >
      {children}
    </button>
  );
};

export default Button;