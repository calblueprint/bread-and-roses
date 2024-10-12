import type { UUID } from 'crypto';
import React from 'react';
import { EventListing } from './styles';

export default function EventListingCard({ id }: { id: UUID }) {
  return <EventListing> {id} </EventListing>;
}
