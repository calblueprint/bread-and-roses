/* eslint-disable react/no-unescaped-entities */
import { Background } from '../styles';
import {
  Circle,
  ContinueButton,
  ContinueText,
  InlineContainer,
  ReviewContainer,
  Title,
} from './styles';

export default function Onboarding() {
  return (
    <Background>
      <Circle />
      <InlineContainer>
        <ReviewContainer>
          <Title>You're all set!</Title>
          <text>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </text>
          <ContinueButton>
            <ContinueText>Continue</ContinueText>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
