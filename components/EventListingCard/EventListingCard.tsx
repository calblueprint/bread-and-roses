import React from 'react';
import { EventListing } from './styles';

export default function EventListingCard({ genre }: { genre: string }) {
  return <EventListing> {genre} </EventListing>;
}
