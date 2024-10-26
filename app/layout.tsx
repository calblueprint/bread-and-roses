import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { BespokeSans } from '../styles/fonts';
import '../styles/global.css';
import { OnboardingProvider } from '../utils/onboardingContext';

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
      <body className={BespokeSans.className}>
        <StyledComponentsRegistry>
          <OnboardingProvider>{children}</OnboardingProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
