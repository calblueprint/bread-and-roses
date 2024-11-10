/* eslint-disable react/no-unescaped-entities */
import Rose from '@/public/images/rose.svg';
import { SMALL } from '@/styles/text';
import { Background } from '../styles';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
  Title,
} from './styles';

export default function Onboarding() {
  return (
    <Background>
      <Image src={Rose} alt="Rose" />
      <InlineContainer>
        <ReviewContainer>
          <Title>You're all set!</Title>
          <text>
            We recommend checking out some upcoming events in the Discover page.
            If you’re interested in participating, please sign up!
          </text>
          <ContinueButton>
            <SMALL $fontWeight="400" $color="white">
              Continue
            </SMALL>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
