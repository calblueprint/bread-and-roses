import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import COLORS from '@/styles/colors';
import { Sans } from '../styles/fonts';
import '../styles/global.css';
import { AuthContextProvider } from '@/utils/AuthProvider';
import { OnboardingProvider } from '@/utils/onboardingContext';

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
      <body className={Sans.className} style={{ background: COLORS.gray1 }}>
        <StyledComponentsRegistry>
          <AuthContextProvider>
            <OnboardingProvider>{children}</OnboardingProvider>
          </AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
