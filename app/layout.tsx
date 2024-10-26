import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { Sans } from '../styles/fonts';
import '../styles/global.css';

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: 'Project Name',
  description: 'Description of project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Sans.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
