'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  fetchAcceptedEventsByFacility,
  fetchSignedUpEventsByVolunteer,
} from '@/api/supabase/queries/events';
import MenuBar from '@/components/MenuBar/MenuBar';
import MyEventCard from '@/components/MyEventCard/MyEventCard';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { Event } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import * as styles from './styles';

type GroupedEvents = {
  [monthYear: string]: Event[];
};

interface VolunteerEvent extends Event {
  is_accepted: boolean;
}

export default function EventPage() {
  const router = useRouter();
  const { session } = useSession();
  const { userRole } = useSession();

  const [rawData, setRawData] = useState<Event[] | VolunteerEvent[]>([]);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [selectedView, setSelectedView] = useState<
    'scheduled' | 'applied' | 'proposed'
  >('scheduled');
  const [loading, setLoading] = useState(true);

  const handleAppliedContinue = () => router.push('/discover');
  const handleProposedContinue = () => router.push('/availability/general');

  useEffect(() => {
    if (session?.user) {
      const fetchEvents = async () => {
        try {
          let events = [];
          if (userRole === 'volunteer') {
            events = await fetchSignedUpEventsByVolunteer(session.user.id);
          } else if (userRole === 'facility') {
            events = await fetchAcceptedEventsByFacility(session.user.id);
          }
          setRawData(events ?? []);
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [session?.user, userRole]);

  const processedEvents = useMemo(() => {
    const now = new Date();

    const filtered = rawData.filter(event => {
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

    const uniqueMap = new Map<string, Event>();
    filtered.forEach(event => {
      if (!uniqueMap.has(event.event_id)) {
        uniqueMap.set(event.event_id, event);
      }
    });

    const grouped: GroupedEvents = {};
    for (const event of uniqueMap.values()) {
      const date = new Date(event.start_date_time);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    }

    Object.values(grouped).forEach(events => {
      events.sort(
        (a, b) =>
          new Date(a.start_date_time).getTime() -
          new Date(b.start_date_time).getTime(),
      );
    });

    return grouped;
  }, [rawData, selectedView, userRole]);

  const sortedEntries = Object.entries(processedEvents).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  if (loading || !userRole) {
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRoute allowAnyRole>
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

            {sortedEntries.map(([monthKey, events]) => {
              const [year, monthNum] = monthKey.split('-');
              const monthDate = new Date(
                parseInt(year),
                parseInt(monthNum) - 1,
              );
              const displayMonth = monthDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              });

              return (
                <div key={monthKey}>
                  <styles.MonthYear
                    $fontWeight="500"
                    $color="#000"
                    $align="left"
                  >
                    {displayMonth}
                  </styles.MonthYear>
                  {events.map(event => (
                    <Link
                      key={event.event_id}
                      href={`/events/${event.event_id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <MyEventCard {...event} />
                    </Link>
                  ))}
                </div>
              );
            })}

            {sortedEntries.length === 0 && (
              <styles.EmptyStateWrapper>
                <styles.SubHeaderText>
                  Nothing to see here. Yet.
                </styles.SubHeaderText>
                {selectedView === 'applied' && (
                  <>
                    <styles.SmallText>
                      Want to change that? <br /> Click the button to sign up
                      for events.
                    </styles.SmallText>
                    <styles.SignUpButton onClick={handleAppliedContinue}>
                      Sign up here
                    </styles.SignUpButton>
                  </>
                )}
                {selectedView === 'proposed' && (
                  <>
                    <styles.SmallText>
                      Want to change that? <br /> Click the button to create an
                      availability.
                    </styles.SmallText>
                    <styles.SignUpButton onClick={handleProposedContinue}>
                      Create here
                    </styles.SignUpButton>
                  </>
                )}
                {selectedView === 'scheduled' && (
                  <styles.SmallText>
                    Hang tight! <br /> Bread & Roses is currently working on
                    finalizing your events.
                  </styles.SmallText>
                )}
              </styles.EmptyStateWrapper>
            )}
          </styles.AllEventsHolder>
        </styles.Page>
      </div>
    </ProtectedRoute>
  );
}
