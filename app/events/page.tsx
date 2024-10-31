'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '@/api/supabase/queries/events';
import { Event } from '@/types/schema';

export default function Page() {
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    fetchAllEvents().then(eventsData => {
      setData(eventsData ?? []);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>event_id</th>
            <th>facility_id</th>
            <th>start_date_time</th>
            <th>end_date_time</th>
            <th>performance_type</th>
            <th>genre</th>
            <th>needs_host</th>
            <th>performer_type</th>
            <th>event_status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.event_id}>
              <td>{d.event_id}</td>
              <td>{d.facility_id}</td>
              <td>{d.start_date_time}</td>
              <td>{d.end_date_time}</td>
              <td>{d.performance_type}</td>
              <td>{d.genre}</td>
              <td>{d.needs_host}</td>
              <td>{d.performer_type}</td>
              <td>{d.event_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
