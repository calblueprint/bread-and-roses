import React from 'react';
import Link from 'next/link';
import { PerformanceType } from '@/types/schema';
import { EventListing } from './styles';

export default function EventListingCard({
  performance_type,
  id,
}: {
  performance_type: PerformanceType;
  id: string;
}) {
  return (
    <Link href={`/discover/${id}`}>
      <EventListing> {performance_type} </EventListing>
    </Link>
  );
}
