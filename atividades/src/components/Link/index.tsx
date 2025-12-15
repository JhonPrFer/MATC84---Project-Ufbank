import Link from "next/link";

import { Link as MUILink } from "@mui/material";

interface CustomLinkProps {
  href: string;
  label: string;
  underline?: "none" | "hover" | "always";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "text";
}

export const CustomLink = ({
  href,
  label,
  underline = "hover",
  color = "text",
}: CustomLinkProps) => {
  return (
    <MUILink underline={underline} color={color}>
      <Link href={href}>{label}</Link>
    </MUILink>
  );
};
