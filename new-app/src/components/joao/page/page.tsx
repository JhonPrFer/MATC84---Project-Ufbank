import { Typography } from "@mui/material";

interface CustomPageProps {
  title: string;
  children: React.ReactNode;
}

export function CustomPage({ title, children }: CustomPageProps) {
  return (
    <main className="p-3">
      <Typography variant="h3">{title}</Typography>
      <article className="w-2xl p-2">{children}</article>
    </main>
  );
}
