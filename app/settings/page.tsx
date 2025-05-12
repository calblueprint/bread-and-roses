'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchFacilityContactInfo,
  fetchFacilityInfo,
} from '@/api/supabase/queries/facilities';
import {
  fetchVolunteerInfo,
  fetchVolunteerPreferences,
} from '@/api/supabase/queries/volunteers';
import MenuBar from '@/components/MenuBar/MenuBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import SettingsCardAccomodations from '@/components/SettingsCard/SettingsCardAccomodations';
import SettingsCardFacilityContactDetails from '@/components/SettingsCard/SettingsCardFacilityContactDetails';
import SettingsCardFacilityLocation from '@/components/SettingsCard/SettingsCardFacilityLocation';
import SettingsCardFacilityLogistics from '@/components/SettingsCard/SettingsCardFacilityLogistics';
import SettingsCardFacilityPreferences from '@/components/SettingsCard/SettingsCardFacilityPreferences';
import SettingsCardHostInfo from '@/components/SettingsCard/SettingsCardHostInfo';
import SettingsCardPerformanceInterest from '@/components/SettingsCard/SettingsCardPerformanceInterest';
import SettingsCardPersonalDetails from '@/components/SettingsCard/SettingsCardPersonalDetails';
import SettingsCardShowPreferences from '@/components/SettingsCard/SettingsCardShowPreferences';
import SettingsCardVolunteerRoleSpecific from '@/components/SettingsCard/SettingsCardVolunteerRoleSpecific';
import SignOut from '@/public/images/signout.svg';
import { useSession } from '@/utils/AuthProvider';
import { FacilityInfo, UserInfo, UserPreferences } from '@/utils/settingsInfo';
import * as styles from './styles';

export default function SettingsPage() {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false); // Track the expanded state of the menu
  const { session, signOut, userRole } = useSession();
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
    role: [],
    performance_type: [],
    locations: [],
    additional_info: '',
    info: {
      performer_has_own_sound_equipment: '',
      performer_needs_piano: '',
      performer_can_host_self: '',
      host_availability: '',
      host_willing_to_pick_up_sound_equipment: '',
      host_willing_to_use_sound_equip: '',
    },
  });
  const [facilityContactInfo, setFacilityContactInfo] = useState<UserInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo>({
    name: '',
    county: '',
    city: '',
    street_address_1: '',
    street_address_2: '',
    audience: [],
    type: '',
    info: {
      parking: '',
      has_piano: false,
      has_sound_equipment: false,
    },
    has_host: false,
    host_email: '',
    host_name: '',
    host_phone_number: '',
  });
  const [editedUserInfo, setEditedUserInfo] = useState<UserInfo>(userInfo);
  const [editedUserPrefs, setEditedUserPrefs] =
    useState<UserPreferences>(userPreferences);

  const [editedFacilityContactInfo, setEditedFacilityContactInfo] =
    useState<UserInfo>(facilityContactInfo);

  const [editedFacilityInfo, setEditedFacilityInfo] =
    useState<FacilityInfo>(facilityInfo);

  const handleSignOut = () => {
    router.push('/');
    setTimeout(() => {
      signOut();
    }, 500);
  };

  useEffect(() => {
    const getUserData = async () => {
      if (session && userRole == 'volunteer') {
        const fetchedUserInfo = await fetchVolunteerInfo(session.user.id);
        setUserInfo(fetchedUserInfo);
        setEditedUserInfo(fetchedUserInfo);

        const fetchedUserPreferences = await fetchVolunteerPreferences(
          session.user.id,
        );
        setUserPreferences(fetchedUserPreferences);
        setEditedUserPrefs(fetchedUserPreferences);
      }
      if (session && userRole == 'facility') {
        const fetchedFacilityContactInfo = await fetchFacilityContactInfo(
          session.user.id,
        );
        setFacilityContactInfo(fetchedFacilityContactInfo);
        setEditedFacilityContactInfo(fetchedFacilityContactInfo);

        const fetchedFacilityInfo = await fetchFacilityInfo(session.user.id);
        setFacilityInfo(fetchedFacilityInfo);
        setEditedFacilityInfo(fetchedFacilityInfo);
      }
    };
    getUserData();
  }, [session, userRole]);

  if (
    !session ||
    !session.user ||
    !userInfo ||
    !userPreferences ||
    !facilityContactInfo ||
    !facilityInfo
  ) {
    return <div></div>;
  }

  return (
    session && (
      <ProtectedRoute allowAnyRole>
        <styles.All>
          {userRole == 'volunteer' && (
            <div>
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
                  <SettingsCardVolunteerRoleSpecific
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
            </div>
          )}
          {userRole == 'facility' && (
            <div>
              <MenuBar setMenuExpanded={setMenuExpanded} />
              <styles.Page $menuExpanded={menuExpanded}>
                <styles.SettingDiv>
                  <styles.ProfileName>
                    {facilityContactInfo.first_name}{' '}
                    {facilityContactInfo.last_name}
                  </styles.ProfileName>
                  <styles.Email> {facilityContactInfo.email} </styles.Email>
                  <styles.SignOutButton onClick={() => handleSignOut()}>
                    <styles.SignOut src={SignOut} alt="SignOut" />
                    <styles.ButtonText> Sign Out </styles.ButtonText>
                  </styles.SignOutButton>
                  <SettingsCardFacilityContactDetails
                    first_name={facilityContactInfo.first_name}
                    last_name={facilityContactInfo.last_name}
                    phone={facilityContactInfo.phone_number}
                    userInfo={facilityContactInfo}
                    editInfo={editedFacilityContactInfo}
                    setEditInfo={setEditedFacilityContactInfo}
                    setFacilityContactInfo={setFacilityContactInfo}
                    userId={session.user.id}
                  />
                  <SettingsCardFacilityLocation
                    name={facilityInfo.name}
                    city={facilityInfo.city}
                    county={facilityInfo.county}
                    street_address_1={facilityInfo.street_address_1}
                    street_address_2={facilityInfo.street_address_2}
                    facilityInfo={facilityInfo}
                    editInfo={editedFacilityInfo}
                    setEditInfo={setEditedFacilityInfo}
                    setFacilityInfo={setFacilityInfo}
                    userId={session.user.id}
                  />
                  <SettingsCardFacilityPreferences
                    type={facilityInfo.type}
                    audience_preferences={facilityInfo.audience}
                    facilityInfo={facilityInfo}
                    editInfo={editedFacilityInfo}
                    setEditInfo={setEditedFacilityInfo}
                    setFacilityInfo={setFacilityInfo}
                    userId={session.user.id}
                  />
                  <SettingsCardFacilityLogistics
                    info={facilityInfo.info}
                    facilityInfo={facilityInfo}
                    editInfo={editedFacilityInfo}
                    setEditInfo={setEditedFacilityInfo}
                    setFacilityInfo={setFacilityInfo}
                    userId={session.user.id}
                  />
                  <SettingsCardHostInfo
                    hostName={facilityInfo.host_name}
                    hostEmail={facilityInfo.host_email}
                    hostPhone={facilityInfo.host_phone_number}
                    facilityInfo={facilityInfo}
                    editInfo={editedFacilityInfo}
                    setEditInfo={setEditedFacilityInfo}
                    setFacilityInfo={setFacilityInfo}
                    userId={session.user.id}
                  />
                </styles.SettingDiv>
              </styles.Page>
            </div>
          )}
        </styles.All>
      </ProtectedRoute>
    )
  );
}
