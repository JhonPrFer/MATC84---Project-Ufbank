import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ufbank - Payment Machines",
  description: "Sistema de cadastro de máquinas de pagamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
