// add schemas here!

import type { UUID } from 'crypto';

// used for events and volunteer_preference tables
export type TypeOfAct =
  | 'Music'
  | 'Dance'
  | 'Poetry'
  | 'Juggling'
  | 'Clowning'
  | 'Comedy'
  | 'Magic'
  | 'Storytelling'
  | 'Bubbles'
  | 'Puppetry';

// used for events and volunteer_preference tables
export type Genre =
  | 'A Cappella'
  | 'Bluegrass'
  | 'Blues'
  | "Children's songs"
  | 'Classical'
  | 'Country'
  | 'Folk'
  | 'Jazz'
  | 'Pop'
  | 'R&B'
  | 'Rock'
  | 'Standards';

export type EventStatus = 'ACTIVE' | 'INACTIVE';

export interface Event {
  event_id: UUID;
  facility_id: UUID;
  start_date_time: string; //timestamptz
  end_date_time: string; //timestamptz
  type_of_act: TypeOfAct;
  genre: Genre;
  needs_host: boolean;
  performer_type: string;
  event_status: EventStatus;
}
