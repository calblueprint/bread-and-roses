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
  performance_type: string[];
  locations: string[];
  additional_info: string;
}
