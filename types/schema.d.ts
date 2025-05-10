// add schemas here!
import type { UUID } from 'crypto';

// used for volunteer_preference tables
export type PerformanceType =
  | 'Music'
  | 'Dance'
  | 'Poetry'
  | 'Juggling'
  | 'Clowning'
  | 'Comedy'
  | 'Magic'
  | 'Storytelling'
  | 'Bubbles'
  | 'Puppetry'
  | 'Other';

// used for volunteers_preference and facilities table
export type FacilityType =
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

// used for volunteer_preference tables
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
  | 'Standards'
  | 'Other';

// used for events table
export type EventStatus = 'Active' | 'Inactive';

// used for event_signups table
export type Role = 'Host' | 'Performer';

export type PerformerType =
  | 'Solo'
  | 'Duo'
  | 'Trio'
  | 'Quartet'
  | 'Five or More';

export interface Availabilities {
  availability_id: UUID;
  facility_id: UUID;
  name: string;
  additional_info: string;
}

export interface AvailableDates {
  date_id: UUID;
  availability_id: UUID;
  start_date_time: string; //timestamptz
  end_date_time: string; //timestamptz
}

export interface Event {
  event_id: UUID; // not sure if i need?
  facility_id: UUID;
  start_date_time: string; //timestamptz
  end_date_time: string; //timestamptz
  name: string;
  needs_host: boolean;
  event_status: EventStatus;
  notes?: string;
  producer_name: string;
  producer_email: string;
  producer_phone_number: string;
}

export interface EventSignups {
  event_id: UUID;
  user_id: UUID;
  role: Role;
  is_accepted: boolean;
  additional_info?: string;
  group_size: number;
}

export interface FacilityContacts {
  user_id: UUID;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  facility_id: UUID;
}

export type ParkingOptions = 'Street' | 'Parking Lot' | 'None';

export interface FacilityInfo {
  parking: ParkingOptions;
  has_piano: boolean;
  has_sound_equipment: boolean;
}

export interface Facilities {
  facility_id: UUID;
  name: string;
  county: string;
  city: string;
  street_address_1: string;
  street_address_2?: string;
  audience: Audience[];
  type: FacilityType;
  host_name?: string;
  host_email?: string;
  host_phone_number?: string;
  user_id: UUID;
  is_approved: boolean;
  admin_notes?: string;
  info: FacilityInfo;
  host_email: string;
  zip: string;
  has_host: boolean;
  is_finalized: boolean;
  volunteer_notes?: string;
  directions: string;
  capacity: string;
  admin_added_notes: string;
}

export interface Volunteers {
  user_id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface VolunteersPreferences {
  user_id: UUID;
  role?: Role[];
  performance_type?: PerformanceType[];
  performer_type?: PerformerType[];
  facility_type?: FacilityType[];
  locations?: string[];
  audience?: Audience[];
  genre?: Genre[];
  additional_info?: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}
