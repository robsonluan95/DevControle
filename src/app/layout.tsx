import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - seu sistema de gerenciamento.",
  description: "Gerencie seus  projetos com a Dev Controle!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header/>
            {children}
          </ModalProvider>
        </AuthProvider>
        </body>
      
    </html>
  );
}
