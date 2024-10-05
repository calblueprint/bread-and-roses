'use client';

import React from 'react';
import { getAllEvents } from '../../api/supabase/queries/events';

export default async function page() {
  return (
    <div>
      <tr>
        <th>event_id</th>
        <th>facility_id</th>
        <th>start_date_time</th>
        <th>end_date_time</th>
        <th>type_of_act</th>
        <th>genre</th>
        <th>needs_host</th>
        <th>performer_type</th>
        <th>event_status</th>
      </tr>
    </div>
  );
}
