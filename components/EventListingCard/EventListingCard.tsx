import React from 'react';
import { PerformanceType } from '@/types/schema';
import { EventListing } from './styles';

export default function EventListingCard({
  performance_type,
}: {
  performance_type: PerformanceType;
}) {
  return <EventListing> {performance_type} </EventListing>;
}
