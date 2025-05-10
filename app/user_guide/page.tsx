'use client';

import React, { useState } from 'react';
import MenuBar from '@/components/MenuBar/MenuBar';
import { useSession } from '@/utils/AuthProvider';
import * as styles from './styles';

export default function UserGuidePage() {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const { userRole } = useSession();
  if (!userRole) {
    return <div></div>;
  }
  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <styles.Page $menuExpanded={menuExpanded}>
        <styles.Guide>
          <styles.Title> User Guide </styles.Title>
          <div>
            <styles.Title>
              {userRole == 'volunteer' ? 'Discover' : 'Availability'}
            </styles.Title>
            <styles.Divider />
            {userRole == 'volunteer' && (
              <div>
                <styles.Header> Search </styles.Header>
                <styles.Text>
                  Find different events by searching by County, City, and
                  Facility Name. Enter any text and click the Enter / Return
                  button on your keyboard to show the results.
                </styles.Text>
                <styles.Header> Filter </styles.Header>
                <styles.Text>
                  {' '}
                  Refine your search by applying filters like type of facility,
                  county, audience, and more. Click the filter button to the
                  right of the search bar or the filter icon just below the
                  search bar to start. Once you select what filters you want
                  click the <b>Apply</b> button to see the results. Feel free to
                  click the X&apos;s next to filters to clear them or click the{' '}
                  <b>Reset</b> button to remove all filters.
                </styles.Text>
                <styles.Header> Signing Up For Events</styles.Header>
                <styles.Text>
                  Once you find an event you are interested in, click on the
                  event card and you will see an event page. On the left is
                  various event info, while on the right is where you will be
                  able to sign up as either a <b>Volunteer</b> or a <b>Host</b>.
                  Click whatever roles you want to do and click the{' '}
                  <b>Sign up</b> button to signup! If you ever change your mind,
                  you can go to the same event and be able to unsign up. <br />{' '}
                  <br /> This does <b>not</b> mean you are going to volunteer
                  for sure yet. Staff at Bread and Roses will choose the best
                  fits for the facilities out of all the signups and notify you
                  when they finalize everything.
                </styles.Text>
              </div>
            )}
            {userRole == 'facility' && (
              <div>
                <styles.Header> Adding New Availabilities </styles.Header>
                <styles.Text>
                  Availabilities are for what days and times your facility
                  available to host an event. This helps Bread and Roses Staff
                  create an event that works for everyone! To add a new
                  availability, click the plus sign in the top right. Add a
                  name, select days on the calendar, select what times you are
                  available, enter some additional info and click. Then wait
                  patiently while staff figure things out!
                </styles.Text>
                <styles.Header> Editing Availabilities </styles.Header>
                <styles.Text>
                  If you need to edit your availability for whatever reason,
                  click the respective card, then click the edit icon in the top
                  right. Make any changes necessary and save!
                </styles.Text>
              </div>
            )}
          </div>
          <div>
            <styles.Title> Upcoming Events </styles.Title>
            <styles.Divider />
            {userRole == 'volunteer' && (
              <div>
                <styles.Header> Scheduled </styles.Header>
                <styles.Text>
                  {' '}
                  This tab shows all events you are <b> confirmed</b> for. This
                  means you will be performing at this event. If you have any
                  questions or need to back out of this event for whatever
                  reason, please contact Bread and Roses Staff at
                  info@breadandroses.org. If you click on the event card, you
                  can see more details about the event.
                </styles.Text>
                <styles.Header> Applied </styles.Header>
                <styles.Text>
                  {' '}
                  This tab shows all events you have applied for. This means you
                  will be performing at this event. This does <b>not</b> mean
                  you are going to volunteer for sure yet. Staff at Bread and
                  Roses will choose the best fits for the facilities out of all
                  the signups and notify you when they finalize everything. If
                  you click on the card, it will take you to the event page and
                  allow you to unsign up from there.
                </styles.Text>
              </div>
            )}
            {userRole == 'facility' && (
              <div>
                <styles.Header> Scheduled </styles.Header>
                <styles.Text>
                  {' '}
                  This tab shows all events your facility is <b>
                    {' '}
                    confirmed
                  </b>{' '}
                  for. This means there will be performers coming. If you have
                  any questions or need to back out of this event for whatever
                  reason, please contact Bread and Roses Staff at
                  info@breadandroses.org. If you click on the event card, you
                  can see more details about the event.
                </styles.Text>
                <styles.Header> Proposed </styles.Header>
                <styles.Text>
                  {' '}
                  This tab shows all events that Bread and Roses is currently
                  looking for volunteers for. This means the event is{' '}
                  <b> not</b> confirmed yet. Once volunteers are found and the
                  event can proceed, Bread and Roses Staff will notify you!
                </styles.Text>
              </div>
            )}
          </div>
          <div>
            <styles.Title> Settings </styles.Title>
            <styles.Divider />
            <styles.Header> Personal Details </styles.Header>
            <styles.Text>
              Manage your personal {userRole == 'facility' && 'and facility'}
              details all in one place. Click the edit icon in the top right to
              make any necessary changes. Be sure to always keep your profile up
              to date!
            </styles.Text>
          </div>
          <styles.Text>
            {' '}
            * If you ever have any issues feel free to reach out to
            info@breadandroses.org{' '}
          </styles.Text>
        </styles.Guide>
      </styles.Page>
    </div>
  );
}
