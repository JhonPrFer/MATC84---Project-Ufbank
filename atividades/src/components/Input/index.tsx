import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import {
  UseFormRegister,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  name: string;
  label: string;
  register: UseFormRegister<Record<string, string>>;
  value?: string;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  type?: "text" | "password" | "email" | "number";
  size?: "small" | "medium";
  margin?: "none" | "dense" | "normal";
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  endAdornment?: React.ReactNode;
}

const Input = ({
  name,
  label,
  register,
  value,
  helperText,
  variant = "outlined",
  type = "text",
  size = "medium",
  margin = "normal",
  required = false,
  disabled = false,
  fullWidth = false,
  endAdornment,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...register(name, { required: required ? "Campo obrigatório" : "" })}
      name={name}
      label={label}
      variant={variant}
      helperText={helperText}
      type={type == "password" && showPassword ? "text" : type}
      size={size}
      margin={margin}
      fullWidth={fullWidth}
      disabled={disabled}
      slotProps={{
        input: {
          endAdornment:
            type == "password" ? (
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            ) : (
              endAdornment
            ),
        },
      }}
    />
  );
};
export default Input;
