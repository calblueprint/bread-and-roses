import React from 'react';
import { ProgressBarContainer, ProgressBarFiller } from './styles';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <ProgressBarContainer>
      <ProgressBarFiller progress={progress}></ProgressBarFiller>
    </ProgressBarContainer>
  );
}
