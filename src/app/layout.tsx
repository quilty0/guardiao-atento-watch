import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guardião Atento - Versão Paciente',
  description: 'Sistema de monitoramento para pacientes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
} 