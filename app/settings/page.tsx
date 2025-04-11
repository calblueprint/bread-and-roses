'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchVolunteerInfo,
  fetchVolunteerPreferences,
} from '@/api/supabase/queries/volunteers';
import MenuBar from '@/components/MenuBar/MenuBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import SettingsCardAccomodations from '@/components/SettingsCard/SettingsCardAccomodations';
import SettingsCardNotifications from '@/components/SettingsCard/SettingsCardNotifications';
import SettingsCardPerformanceInterest from '@/components/SettingsCard/SettingsCardPerformanceInterest';
import SettingsCardPersonalDetails from '@/components/SettingsCard/SettingsCardPersonalDetails';
import SettingsCardShowPreferences from '@/components/SettingsCard/SettingsCardShowPreferences';
import SignOut from '@/public/images/signout.svg';
import { useSession } from '@/utils/AuthProvider';
import * as styles from './styles';

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface UserPreferences {
  facility_type: string[];
  audience_type: string[];
  genre: string[];
  performance_type: string[];
  locations: string[];
  additional_info: string;
}

export default function SettingsPage() {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false); // Track the expanded state of the menu
  const { session } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!session || !session.user) {
        return;
      }
      const fetchedUserInfo = await fetchVolunteerInfo(session.user.id);
      setUserInfo(fetchedUserInfo);
      const fetchedUserPreferences = await fetchVolunteerPreferences(
        session.user.id,
      );
      setUserPreferences(fetchedUserPreferences);
    };
    getUserData();
  }, [session]);

  if (!session || !session.user || !userInfo || !userPreferences) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute allowAnyRole>
      <styles.All>
        <MenuBar setMenuExpanded={setMenuExpanded} />
        <styles.Page $menuExpanded={menuExpanded}>
          <styles.SettingDiv>
            <styles.ProfileName>
              {' '}
              {userInfo.first_name} {userInfo.last_name}{' '}
            </styles.ProfileName>
            <styles.Email> {userInfo.email} </styles.Email>
            <styles.SignOutButton>
              <styles.SignOut src={SignOut} alt="SignOut" />
              <styles.ButtonText> Sign Out </styles.ButtonText>
            </styles.SignOutButton>
            <SettingsCardPersonalDetails
              first_name={userInfo.first_name}
              last_name={userInfo.last_name}
              phone={userInfo.phone_number}
            />
            <SettingsCardNotifications />
            <SettingsCardShowPreferences
              facility_preferences={userPreferences.facility_type}
              locations={userPreferences.locations}
              audience_preferences={userPreferences.audience_type}
            />
            <SettingsCardPerformanceInterest
              performance_types={userPreferences.performance_type}
              genres={userPreferences.genre}
            />
            <SettingsCardAccomodations
              accomodations={userPreferences.additional_info}
            />
          </styles.SettingDiv>
        </styles.Page>
      </styles.All>
    </ProtectedRoute>
  );
}
