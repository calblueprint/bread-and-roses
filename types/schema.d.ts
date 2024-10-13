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

// used for volunteers_preference and facilities table
export type TypeOfFacility =
  | 'Assisted Living'
  | "Children's Day Care"
  | 'Detention Center'
  | 'Developmentally Disabled'
  | 'Food Bank'
  | 'Homeless Services'
  | 'Hospital'
  | 'Mental Health Services'
  | 'Recovery Center'
  | 'Senior Day Program'
  | 'Skilled Nursing Care'
  | 'Special Needs School'
  | 'Visually Impaired';

// used for volunteers_preferences table
// NEEDS TO BE UPDATED
export type Instruments = 'Guitar' | 'Violin' | 'Flute' | 'Trumpet' | 'Bass';

// used for volunteers_preferences table
export type Audience = 'Youth' | 'Adults' | 'Senior ';

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

// used for events table
export type EventStatus = 'ACTIVE' | 'INACTIVE';

// used for event_signups table
export type Role = 'Host' | 'Performer';

// used for availabilities table
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type TypeOfPerformer = 'Solo' | 'Duo' | 'Band';

export interface Availabilities {
  availability_id: UUID;
  facility_id: UUID;
  date: Date; // date
  day_of_week: Day;
  start_time: string; // timestamptz
  end_time: string; // timestamptz
  is_recurring: boolean;
}

export interface Event {
  event_id: UUID;
  facility_id: UUID;
  start_date_time: string; //timestamptz
  end_date_time: string; //timestamptz
  type_of_act: TypeOfAct;
  genre: Genre;
  needs_host: boolean;
  performer_type: TypeOfPerformer;
  event_status: EventStatus;
}

export interface EventSignups {
  event_id: UUID;
  volunteer_id: UUID;
  role: Role;
  is_accepted: boolean;
}

export interface Facilities {
  facility_id: UUID;
  name: string;
  email: string;
  phone_number: string;
  state: string;
  city: string;
  street_address_1: string;
  street_address_2?: string;
  postal_code: string;
  audience: Audience;
  type: TypeOfFacility;
  host_name?: string;
  host_contact?: string;
  poc_name: string;
  poc_contact: string;
  notifications_opt_in: boolean;
}

export interface Volunteers {
  volunteer_id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  notifications_opt_in: boolean;
}

export interface VolunteersPreferences {
  volunteer_id: UUID;
  city?: string;
  genre?: Genre;
  instruments?: Instruments;
  type_of_act?: TypeOfAct;
  audience?: Audience;
  facility_type?: TypeOfFacility;
}
