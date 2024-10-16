import Link from 'next/link';
import { Container, Image } from './page.style';

export default function Home() {
  return (
    <Container>
      <Image
        src={'/images/bp-logo.png'}
        width={50}
        height={50}
        alt="Blueprint Logo"
      />
      <p>Open up app/page.tsx to get started!</p>

      <Link href="/onboarding">
        <button>Onboarding</button>
      </Link>
    </Container>
  );
}
