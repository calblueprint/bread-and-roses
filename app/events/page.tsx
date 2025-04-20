'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  fetchAcceptedEventsByFacility,
  fetchSignedUpEventsByVolunteer,
} from '@/api/supabase/queries/events';
import MenuBar from '@/components/MenuBar/MenuBar';
import MyEventCard from '@/components/MyEventCard/MyEventCard';
import { Event } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import * as styles from './styles';

type GroupedEvents = {
  [monthYear: string]: Event[]; // Each key is a "Month Year" string, and the value is an array of Events
};

interface VolunteerEvent extends Event {
  is_accepted: boolean;
}

export default function EventPage() {
  const router = useRouter();

  const handleAppliedContinue = () => {
    router.push('/discover');
  };

  const handleProposedContinue = () => {
    router.push('/availability/general');
  };

  const [data, setData] = useState<Event[] | VolunteerEvent[]>([]);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu
  const { session } = useSession();
  const { userRole } = useSession();
  const [selectedView, setSelectedView] = useState<
    'scheduled' | 'applied' | 'proposed'
  >('scheduled');

  useEffect(() => {
    if (session?.user) {
      const fetchRoleAndEvents = async () => {
        try {
          let eventsData = [];
          if (userRole === 'volunteer') {
            eventsData = await fetchSignedUpEventsByVolunteer(session.user.id);
          } else if (userRole === 'facility') {
            eventsData = await fetchAcceptedEventsByFacility(session.user.id);
          }
          // eventsData = await fetchAllEvents();
          setData(eventsData ?? []);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchRoleAndEvents();
    }
  }, [session?.user, session?.user.id, userRole]);

  const now = new Date();

  const filteredEvents = data.filter(event => {
    const startTime = new Date(event.start_date_time);
    const isFuture = startTime > now;

    if (userRole === 'volunteer') {
      const volunteerEvent = event as VolunteerEvent;
      if (selectedView === 'scheduled') {
        return (
          isFuture &&
          volunteerEvent.is_accepted &&
          volunteerEvent.event_status === 'Inactive'
        );
      } else if (selectedView === 'applied') {
        return (
          isFuture &&
          !volunteerEvent.is_accepted &&
          volunteerEvent.event_status === 'Active'
        );
      }
    }

    if (userRole === 'facility') {
      if (selectedView === 'scheduled') {
        return isFuture && event.event_status === 'Inactive';
      } else if (selectedView === 'proposed') {
        return isFuture && event.event_status === 'Active';
      }
    }

    return false;
  });

  const groupEventsByMonth = (events: Event[]) => {
    return events.reduce((acc: GroupedEvents, event) => {
      const eventDate = new Date(event.start_date_time);
      const monthYear = eventDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(event);
      return acc;
    }, {} as GroupedEvents);
  };

  const eventsByMonth = groupEventsByMonth(filteredEvents);

  // Sort the events by month
  const sortedEntries = Object.entries(eventsByMonth).sort((a, b) => {
    const dateA = new Date(a[0]); // Month Year string from a
    const dateB = new Date(b[0]); // Month Year string from b
    return dateA.getTime() - dateB.getTime(); // Compare timestamps
  });

  // Sort events within each month by their start date
  sortedEntries.forEach(([, events]) => {
    events.sort((a, b) => {
      return (
        new Date(a.start_date_time).getTime() -
        new Date(b.start_date_time).getTime()
      );
    });
  });

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <styles.Page $menuExpanded={menuExpanded}>
        <styles.AllEventsHolder>
          <styles.Title $fontWeight="500" $color="#000" $align="left">
            Upcoming Events
          </styles.Title>
          <styles.ToggleWrapper>
            <styles.ToggleButton
              $active={selectedView === 'scheduled'}
              onClick={() => setSelectedView('scheduled')}
            >
              Scheduled
            </styles.ToggleButton>

            {userRole === 'volunteer' && (
              <styles.ToggleButton
                $active={selectedView === 'applied'}
                onClick={() => setSelectedView('applied')}
              >
                Applied
              </styles.ToggleButton>
            )}

            {userRole === 'facility' && (
              <styles.ToggleButton
                $active={selectedView === 'proposed'}
                onClick={() => setSelectedView('proposed')}
              >
                Proposed
              </styles.ToggleButton>
            )}
          </styles.ToggleWrapper>

          {sortedEntries.map(([month, events]) => (
            <div key={month}>
              <styles.MonthYear $fontWeight="500" $color="#000" $align="left">
                {month}
              </styles.MonthYear>
              {events.map(event => (
                <Link
                  key={event.event_id}
                  href={`/events/${event.event_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <MyEventCard key={event.event_id} {...event} />
                </Link>
              ))}
            </div>
          ))}
          {sortedEntries.length === 0 && selectedView === 'applied' && (
            <styles.EmptyStateWrapper>
              <styles.SubHeaderText>
                Nothing to see here. Yet.
              </styles.SubHeaderText>
              <styles.SmallText>
                Want to change that? <br /> Click the button to sign up for
                events.
              </styles.SmallText>
              <styles.SignUpButton onClick={handleAppliedContinue}>
                Sign up here
              </styles.SignUpButton>
            </styles.EmptyStateWrapper>
          )}
          {sortedEntries.length === 0 && selectedView === 'proposed' && (
            <styles.EmptyStateWrapper>
              <styles.SubHeaderText>
                Nothing to see here. Yet.
              </styles.SubHeaderText>
              <styles.SmallText>
                Want to change that? <br /> Click the button to create an event.
              </styles.SmallText>
              <styles.SignUpButton onClick={handleProposedContinue}>
                Create here
              </styles.SignUpButton>
            </styles.EmptyStateWrapper>
          )}
          {sortedEntries.length === 0 && selectedView === 'scheduled' && (
            <styles.EmptyStateWrapper>
              <styles.SubHeaderText>
                Nothing to see here. Yet.
              </styles.SubHeaderText>
              <styles.SmallText>
                Hang tight! <br /> Bread & Roses is currently working on
                finalizing your events.
              </styles.SmallText>
            </styles.EmptyStateWrapper>
          )}
        </styles.AllEventsHolder>
      </styles.Page>
    </div>
  );
}
