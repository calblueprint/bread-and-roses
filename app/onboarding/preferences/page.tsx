import Link from 'next/link';
import Back from '@/public/images/back.svg';
import {
  Background,
  ButtonContainer,
  Container,
  ContinueButton,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  Rectangle,
  Title,
} from '../styles';

export default function Onboarding() {
  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/general">
          <Image src={Back} alt="Back icon" />
        </Link>

        <div>
          <Rectangle variant="light" widthPercentage="50%" />
          <Rectangle variant="dark" widthPercentage="50%" />
        </div>
        <Container>
          <Title>Help us tailor shows to you!</Title>
          <text>Facility Type</text>
          <Input />
          <text>Preferred Location</text>
          <Input />
          <text>Audience</text>
          <Input />
          <text>Preferred Equipment</text>
          <Input />
          <text>Type of Act</text>
          <Input />
          <text>Genre</text>
          <Input />
        </Container>
        <ButtonContainer>
          <ContinueButton>
            <ContinueText>Continue</ContinueText>
          </ContinueButton>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
