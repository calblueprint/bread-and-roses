'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  checkUserExists,
  getTempEmail,
  insertVolunteer,
  resendVerificationEmail,
} from '@/api/supabase/queries/auth';
import Bud from '@/public/images/bud.svg';
import EmailIcon from '@/public/images/email.svg';
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
import {
  EmailContainer,
  EmailIconStyled,
  EmailText,
  ResendMessage,
} from './verification-styles';

export default function Verification() {
  const router = useRouter();
  const { session } = useSession();
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const email = getTempEmail();
    setTempEmail(email);
  }, []);

  // Using session to check if the email is confirmed
  useEffect(() => {
    if (session?.user) {
      const isVerified = session.user.email_confirmed_at !== null;
      setIsEmailConfirmed(isVerified);
    }
  }, [session]);

  useEffect(() => {
    if (isEmailConfirmed && session?.user) {
      const addUserToVolunteers = async () => {
        const email = session.user.email;
        if (!email) {
          setIsError(true);
          setResendStatus('Email is undefined. Please try again.');
          return;
        }

        // Check if the volunteer already exists to prevent duplicate inserts
        const exists = await checkUserExists(session.user.id, 'volunteer');
        if (exists) {
          router.push('/success');
          return;
        }

        try {
          const result = await insertVolunteer({
            id: session.user.id,
            email,
          });
          if (result.success) {
            router.push('/success');
          } else {
            setIsError(true);
            setResendStatus(result.message);
          }
        } catch (error) {
          console.error('Error adding user to volunteers:', error);
          setIsError(true);
          setResendStatus('An error occurred while processing your request.');
        }
      };

      addUserToVolunteers();
    }
  }, [isEmailConfirmed, session, router]);

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

  return (
    <Background>
      <Image src={Bud} alt="Bud" />
      <InlineContainer>
        <ReviewContainer>
          <Title>Verification Needed</Title>
          <P>Thanks for signing up!</P>
          <P>
            A verification link has been sent to the email you specified, please
            check your inbox for next steps.
          </P>

          <EmailContainer>
            <EmailIconStyled src={EmailIcon} alt="Email Icon" />
            <EmailText>
              {tempEmail ? tempEmail : 'Email address not found'}
            </EmailText>
          </EmailContainer>

          <RoundedCornerButton
            onClick={handleUseAnotherAccount}
            width="70%"
            $bgColor="white"
            $textColor="black"
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
