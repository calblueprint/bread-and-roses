/* eslint-disable react/no-unescaped-entities */
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
  Rectangle,
  StyledLink,
  Title,
} from '../styles';
import { Checkbox, RedAsterisk, UpdateContainer, UpdateText } from './styles';

export default function Onboarding() {
  return (
    <Background>
      <InlineContainer>
        <Image src={Back} alt="Back icon" />
        <div>
          <Rectangle variant="light" widthPercentage="25%" />
          <Rectangle variant="dark" widthPercentage="75%" />
        </div>
        <Container>
          <Title>Tell us a bit about yourself!</Title>
          <text>
            {' '}
            First Name <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input />
          <text>
            {' '}
            Last Name <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input />
          <text>
            {' '}
            Phone Number <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input />
          <UpdateContainer>
            <Checkbox type="checkbox" />
            <UpdateText>
              I want to get updated when there's an event that matches my
              interest!
            </UpdateText>
          </UpdateContainer>
        </Container>

        <StyledLink href="../onboarding/preferences">
          <ButtonContainer>
            <ContinueButton>
              <ContinueText style={{ fontFamily: 'boo' }}>
                Continue
              </ContinueText>
            </ContinueButton>
          </ButtonContainer>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
