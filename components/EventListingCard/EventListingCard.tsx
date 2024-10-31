import React from 'react';
import { EventListing } from './styles';
import { PerformanceType } from '@/types/schema'

export default function EventListingCard({ performance_type }: { performance_type: PerformanceType }) {
  return <EventListing> {performance_type} </EventListing>;
}
