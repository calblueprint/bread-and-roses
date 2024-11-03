import React from 'react';
import Link from 'next/link';
import { EventListing } from './styles';

export default function EventListingCard({
  genre,
  id,
}: {
  genre: string;
  id: string;
}) {
  return (
    <Link href={`/activeEvents/${id}`}>
      <EventListing> {genre} </EventListing>
    </Link>
  );
}
