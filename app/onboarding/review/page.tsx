import Link from 'next/link';
import Back from '@/public/images/back.svg';
import { Background, InlineContainer, Rectangle, StyledLink } from '../styles';
import {
  ConfirmButton,
  ConfirmText,
  Image,
  Line,
  ReviewContainer,
  SmallText,
  Title,
} from './styles';

export default function Review() {
  return (
    <Background>
      <InlineContainer>
        <div>
          <Rectangle variant="dark" widthPercentage="100%" />
        </div>

        <Link href="/onboarding/preferences">
          <Image src={Back} alt="Back icon" />
        </Link>

        <ReviewContainer>
          <Title>Did we get everything?</Title>
          <text>First Name</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Last Name</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Phone Number</text>
          <SmallText>Lorem Ipsum</SmallText>

          <Line />

          <text>Facility Type</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Preferred Location</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Audience</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Preferred Equipment</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Type of Act</text>
          <SmallText>Lorem Ipsum</SmallText>
          <text>Genre</text>
          <SmallText>Lorem Ipsum</SmallText>

          <StyledLink href="/onboarding/yay">
            <ConfirmButton>
              <ConfirmText>Confirm</ConfirmText>
            </ConfirmButton>
          </StyledLink>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
