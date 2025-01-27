import Image, { StaticImageData } from 'next/image';
import aCappella from '@/public/images/acappella.png';
import bluegrass from '@/public/images/bluegrass.png';
import blues from '@/public/images/blues.png';
import bubbles from '@/public/images/bubbles.png';
import childrens from '@/public/images/childrens.png';
import classical from '@/public/images/classical.png';
import clowning from '@/public/images/clowning.png';
import comedy from '@/public/images/comedy.png';
import country from '@/public/images/country.png';
import dance from '@/public/images/dance.png';
import folk from '@/public/images/folk.png';
import jazz from '@/public/images/jazz.png';
import juggling from '@/public/images/juggling.png';
import magic from '@/public/images/magic.png';
import music from '@/public/images/music.png';
import otherGenre from '@/public/images/other_genre.png';
import otherMusic from '@/public/images/other_music.png';
import poetry from '@/public/images/poetry.png';
import pop from '@/public/images/pop.png';
import puppetry from '@/public/images/puppetry.png';
import rnb from '@/public/images/rnb.png';
import rock from '@/public/images/rock.png';
import standards from '@/public/images/standards.png';
import storytelling from '@/public/images/storytelling.png';

const performanceToPhotoMap = new Map<string, StaticImageData>([
  ['music', music],
  ['dance', dance],
  ['poetry', poetry],
  ['juggling', juggling],
  ['clowning', clowning],
  ['comedy', comedy],
  ['magic', magic],
  ['storytelling', storytelling],
  ['bubbles', bubbles],
  ['puppetry', puppetry],
  ['a cappella', aCappella],
  ['bluegrass', bluegrass],
  ['blues', blues],
  ["children's songs", childrens],
  ['classical', classical],
  ['country', country],
  ['folk', folk],
  ['jazz', jazz],
  ['pop', pop],
  ['r&b', rnb],
  ['rock', rock],
  ['standards', standards],
  ['other_music', otherMusic],
  ['other_genre', otherGenre],
]);

export default function performanceToPhoto(
  performance_type: string,
  genre: string | null,
) {
  performance_type = performance_type.toLowerCase();
  let imgSrc = otherGenre;
  if (!performanceToPhotoMap.has(performance_type)) {
    imgSrc = otherGenre;
  } else if (!genre) {
    imgSrc = performanceToPhotoMap.get(performance_type)!;
  } else {
    genre = genre.toLowerCase();
    if (!performanceToPhotoMap.has(genre)) {
      imgSrc = otherMusic;
    } else {
      imgSrc = performanceToPhotoMap.get(genre)!;
    }
  }
  return <Image src={imgSrc} fill objectFit="cover" alt="performance_photo" />;
}
