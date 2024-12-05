'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import {
  getTempEmail,
  resendVerificationEmail,
} from '@/api/supabase/queries/auth';
import Bud from '@/public/images/bud.svg';
import EmailIcon from '@/public/images/email.svg';
import {
  Background,
  EmailContainer,
  EmailIconStyled,
  EmailText,
  Footer,
  Image,
  InlineContainer,
  Link,
  ResendMessage,
  ReviewContainer,
  RoundedCornerButton,
  Title,
} from '../../../styles/styles';

export default function Verification() {
  const router = useRouter(); // Initialize useRouter
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // TODO: checking if user is verified every 5 seconds until user is verified or if page is reloaded/closed.
    // Not sure if this is the most efficient approach

    // TODO: this still isn't working rn because session is null until sign-in
    const checkVerificationStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      if (session?.user?.user_metadata.email_verified) {
        router.push('/success');
      }
    };

    const interval = setInterval(checkVerificationStatus, 5000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const email = getTempEmail();
    setTempEmail(email);
  }, []);

  const handleResendLink = async () => {
    if (tempEmail) {
      const message = await resendVerificationEmail(tempEmail);
      setIsError(message.includes('Error'));
      setResendStatus(message);
    } else {
      setIsError(true);
    }
  };

  const handleUseAnotherAccount = () => {
    router.push('/signin');
    localStorage.removeItem('tempEmail');
  };

  // TODO: Restyle error message on lines 95-100 (the message containing link back to sign-up)

  return (
    <Background>
      <Image src={Bud} alt="Bud" />
      <InlineContainer>
        <ReviewContainer>
          <Title>Verification Needed</Title>
          <text>Thanks for signing up!</text>
          <text>
            A verification link has been sent to the email you specified, please
            check your inbox for next steps.
          </text>

          <EmailContainer>
            <EmailIconStyled src={EmailIcon} alt="Email Icon" />
            <EmailText>
              {tempEmail ? tempEmail : 'Email address not found'}
            </EmailText>
          </EmailContainer>

          <RoundedCornerButton
            onClick={handleUseAnotherAccount}
            width="70%"
            bgColor="white"
            textColor="black"
          >
            Use another account
          </RoundedCornerButton>

          <Footer>
            Didn&apos;t receive it?{' '}
            <Link href="#" onClick={handleResendLink}>
              Resend link
            </Link>
          </Footer>

          {isError && !tempEmail && (
            <ResendMessage $isError={isError}>
              Email address not found!{' '}
              <Link href="#" onClick={() => router.push('/signup')}>
                Return to the sign-up page
              </Link>{' '}
              to restart the sign-up process.
            </ResendMessage>
          )}

          {resendStatus && tempEmail && (
            <ResendMessage $isError={isError}>{resendStatus}</ResendMessage>
          )}
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
