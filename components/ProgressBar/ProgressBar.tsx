import React from 'react';
import { ProgressBarContainer, ProgressBarFiller } from './styles';

// should be animated however had issues so just static now
export default function ProgressBar({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  return (
    <ProgressBarContainer>
      <ProgressBarFiller from={from} to={to}></ProgressBarFiller>
    </ProgressBarContainer>
  );
}
