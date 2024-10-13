/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Back from '@/assets/images/back.svg';
import {
  Background,
  ButtonContainer,
  Container,
  ContinueButton,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  InputText,
  Rectangle,
  Title,
} from './styles';

export default function Onboarding() {
  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding" passHref>
          <Image src={Back} alt="Back icon" />
        </Link>

        <div>
          <Rectangle variant="light" widthPercentage="50%" />
          <Rectangle variant="dark" widthPercentage="50%" />
        </div>
        <Container>
          <Title>Help us tailor shows to you!</Title>
          <InputText> Facility Type</InputText>
          <Input />
          <InputText> Preferred Location</InputText>
          <Input />
          <InputText> Audience</InputText>
          <Input />
          <InputText> Preferred Equipment</InputText>
          <Input />
          <InputText> Type of Act</InputText>
          <Input />
          <InputText> Genre</InputText>
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
