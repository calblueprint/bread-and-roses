import Image, { StaticImageData } from 'next/image';
import assistedLiving from '@/public/images/assisted_living.png';
import daycare from '@/public/images/daycare.png';
import detentionCenter from '@/public/images/detention_center.png';
import developmentallyDisabled from '@/public/images/developmentally_disabled.png';
import foodBank from '@/public/images/food_bank.png';
import homelessServices from '@/public/images/homeless_services.png';
import hospital from '@/public/images/hospital.png';
import mentalHealthServices from '@/public/images/mental_health.png';
import recoveryCenter from '@/public/images/recovery_center.png';
import seniorDayCenter from '@/public/images/senior_day_program.png';
import skilledNursing from '@/public/images/skilled_nursing_care.png';
import specialNeedsSchool from '@/public/images/special_needs_school.png';
import visuallyImpaired from '@/public/images/visually_impaired.png';

const facilityTypeToPhotoMap = new Map<string, StaticImageData>([
  ['assisted living ', assistedLiving],
  ["children's day care", daycare],
  ['dentetion center', detentionCenter],
  ['developmentally disabled', developmentallyDisabled],
  ['food bank', foodBank],
  ['homeless services', homelessServices],
  ['hospital', hospital],
  ['mental health services', mentalHealthServices],
  ['recovery center', recoveryCenter],
  ['senior day program', seniorDayCenter],
  ['skilled nursing care', skilledNursing],
  ['special needs school', specialNeedsSchool],
  ['visually impaired', visuallyImpaired],
]);

export default function facilityTypeToPhoto(facility_type: string) {
  facility_type = facility_type.toLowerCase();
  const imgSrc = facilityTypeToPhotoMap.get(facility_type) ?? recoveryCenter;
  return <Image src={imgSrc} fill objectFit="cover" alt="performance_photo" />;
}
