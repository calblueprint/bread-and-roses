'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchVolunteerInfo,
  fetchVolunteerPreferences,
} from '@/api/supabase/queries/volunteers';
import MenuBar from '@/components/MenuBar/MenuBar';
import SettingsCardAccomodations from '@/components/SettingsCard/SettingsCardAccomodations';
import SettingsCardNotifications from '@/components/SettingsCard/SettingsCardNotifications';
import SettingsCardPerformanceInterest from '@/components/SettingsCard/SettingsCardPerformanceInterest';
import SettingsCardPersonalDetails from '@/components/SettingsCard/SettingsCardPersonalDetails';
import SettingsCardShowPreferences from '@/components/SettingsCard/SettingsCardShowPreferences';
import SignOut from '@/public/images/signout.svg';
import { useSession } from '@/utils/AuthProvider';
import { UserInfo, UserPreferences } from '@/utils/settingsInfo';
import * as styles from './styles';

export default function SettingsPage() {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false); // Track the expanded state of the menu
  const { session } = useSession();
  const { signOut } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    facility_type: [],
    audience_type: [],
    performer_type: [],
    genre: [],
    performance_type: [],
    locations: [],
    additional_info: '',
  });
  const [editedUserInfo, setEditedUserInfo] = useState<UserInfo>(userInfo);
  const [editedUserPrefs, setEditedUserPrefs] =
    useState<UserPreferences>(userPreferences);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const fetchedUserInfo = await fetchVolunteerInfo(session.user.id);
        setUserInfo(fetchedUserInfo);
        setEditedUserInfo(fetchedUserInfo);

        const fetchedUserPreferences = await fetchVolunteerPreferences(
          session.user.id,
        );
        setUserPreferences(fetchedUserPreferences);
        setEditedUserPrefs(fetchedUserPreferences);
      }
    };
    getUserData();
  }, [session]);

  if (!session || !session.user || !userInfo || !userPreferences) {
    return <div>Loading...</div>;
  }

  return (
    session && (
      <styles.All>
        <MenuBar setMenuExpanded={setMenuExpanded} />
        <styles.Page $menuExpanded={menuExpanded}>
          <styles.SettingDiv>
            <styles.ProfileName>
              {' '}
              {userInfo.first_name} {userInfo.last_name}{' '}
            </styles.ProfileName>
            <styles.Email> {userInfo.email} </styles.Email>
            <styles.SignOutButton onClick={() => handleSignOut()}>
              <styles.SignOut src={SignOut} alt="SignOut" />
              <styles.ButtonText> Sign Out </styles.ButtonText>
            </styles.SignOutButton>
            <SettingsCardPersonalDetails
              first_name={userInfo.first_name}
              last_name={userInfo.last_name}
              phone={userInfo.phone_number}
              userInfo={userInfo}
              editInfo={editedUserInfo}
              setEditInfo={setEditedUserInfo}
              setUserInfo={setUserInfo}
              userId={session.user.id}
            />
            <SettingsCardNotifications />
            <SettingsCardShowPreferences
              facility_preferences={userPreferences.facility_type}
              locations={userPreferences.locations}
              audience_preferences={userPreferences.audience_type}
              userPrefs={userPreferences}
              editPrefs={editedUserPrefs}
              setEditPrefs={setEditedUserPrefs}
              setUserPrefs={setUserPreferences}
              userId={session.user.id}
            />
            <SettingsCardPerformanceInterest
              performance_types={userPreferences.performance_type}
              genres={userPreferences.genre}
              group_size={userPreferences.performer_type}
              userPrefs={userPreferences}
              editPrefs={editedUserPrefs}
              setEditPrefs={setEditedUserPrefs}
              setUserPrefs={setUserPreferences}
              userId={session.user.id}
            />
            <SettingsCardAccomodations
              accomodations={userPreferences.additional_info}
              userPrefs={userPreferences}
              editPrefs={editedUserPrefs}
              setEditPrefs={setEditedUserPrefs}
              setUserPrefs={setUserPreferences}
              userId={session.user.id}
            />
          </styles.SettingDiv>
        </styles.Page>
      </styles.All>
    )
  );
}
