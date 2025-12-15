import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

export const CustomButton = ({
  label,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "small",
  disabled = false,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
};
