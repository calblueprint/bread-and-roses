import Link from 'next/link';
import BPLogo from '@/assets/images/bp-logo.png';
import { Container, Image } from './page.style';

export default function Home() {
  return (
    <Container>
      <Image src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>

      <Link href="/onboarding">
        <button>Onboarding</button>
      </Link>
    </Container>
  );
}
