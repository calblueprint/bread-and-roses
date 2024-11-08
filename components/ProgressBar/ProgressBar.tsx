import React from 'react';
import * as styles from './styles';

const ProgressBar: React.FC = () => {
  return (
    <styles.ProgressBarContainer>
      <styles.ProgressBarFiller progress={20}></styles.ProgressBarFiller>
    </styles.ProgressBarContainer>
  );
};

export default ProgressBar;
