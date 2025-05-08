export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface UserPreferences {
  facility_type: string[];
  audience_type: string[];
  genre: string[];
  performer_type: string[];
  performance_type: string[];
  locations: string[];
  additional_info: string;
}

export interface FacilityInfo {
  name: string;
  county: string;
  city: string;
  street_address_1: string;
  street_address_2: string;
  audience: string[];
  type: string;
  info: {
    parking: string;
    has_piano: boolean;
    has_sound_equipment: boolean;
  };
  has_host: boolean;
  host_email: string;
  host_name: string;
  host_phone_number: string;
}

export interface AdditionalInfo {
  has_sound_equipment: boolean;
  has_piano: boolean;
  parking: string;
}
