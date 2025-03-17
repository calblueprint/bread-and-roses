'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resendVerificationEmail } from '@/api/supabase/queries/auth';
import Bud from '@/public/images/bud.svg';
import EmailIcon from '@/public/images/email.svg';
import COLORS from '@/styles/colors';
import {
  Background,
  Footer,
  Image,
  InlineContainer,
  Link,
  ReviewContainer,
  RoundedCornerButton,
  Title,
} from '@/styles/styles';
import { P } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
import { decryptEmail } from '@/utils/emailTokenUtils';
import {
  EmailContainer,
  EmailIconStyled,
  EmailText,
  ResendMessage,
} from './verification-styles';

export default function Verification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session } = useSession();

  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const token = searchParams.get('token');

    if (token) {
      decryptEmail(token)
        .then(decrypted => {
          setEmail(decrypted);
        })
        .catch(_err => {
          setEmail(null);
          setIsError(true);
          setResendStatus('Invalid or expired verification link.');
        });
    }
  }, [hydrated, searchParams]);

  useEffect(() => {
    if (session?.user?.email_confirmed_at) {
      router.push('/success');
    }
  }, [session?.user?.email_confirmed_at, router]);

  const handleResendLink = async () => {
    if (!email) {
      setIsError(true);
      setResendStatus('No email found.');
      return;
    }

    if (session?.user?.email_confirmed_at) {
      setResendStatus('You are already verified!');
      return;
    }

    const message = await resendVerificationEmail(email);
    setIsError(message.includes('Error'));
    setResendStatus(message);
  };

  const handleUseAnotherAccount = () => {
    router.push('/signin');
  };

  return (
    <Background>
      <Image src={Bud} alt="Bud" />
      <InlineContainer>
        <ReviewContainer>
          <Title>Verification Needed</Title>
          <P $fontWeight={400} $color={COLORS.gray12}>
            Thanks for signing up!
          </P>
          <P $fontWeight={400} $color={COLORS.gray12}>
            A verification link has been sent to your email. Please check your
            inbox.
          </P>
          <EmailContainer>
            <EmailIconStyled src={EmailIcon} alt="Email Icon" />
            <EmailText>{email || 'Email address not found'}</EmailText>
          </EmailContainer>

          <RoundedCornerButton onClick={handleUseAnotherAccount} width="70%">
            Use another account
          </RoundedCornerButton>

          <Footer>
            Didn’t receive it?{' '}
            <Link href="#" onClick={handleResendLink}>
              Resend link
            </Link>
          </Footer>

          {!email && isError && (
            <ResendMessage $isError={true}>
              Email not found or invalid link.{' '}
              <Link href="#" onClick={() => router.push('/signup')}>
                Sign up again
              </Link>
            </ResendMessage>
          )}

          {resendStatus && email && (
            <ResendMessage $isError={isError}>{resendStatus}</ResendMessage>
          )}
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
