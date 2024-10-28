import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { Sans } from '../styles/fonts';
import COLORS from '@/styles/colors';
import '../styles/global.css';
import { OnboardingProvider } from '../utils/onboardingContext';

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: 'Bread & Roses Presents',
  description: 'Created by Blueprint',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={Sans.className}
        style={{ background: COLORS.gray1 }}
      >
        <StyledComponentsRegistry>
            <OnboardingProvider>{children}</OnboardingProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
