'use client';

import React, { useState } from 'react';
import MenuBar from '@/components/MenuBar/MenuBar';
import SettingsCard from '@/components/SettingsCard/SettingsCard';
import * as styles from './styles';

export default function SettingsPage() {
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu

  return (
    <styles.All>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <styles.Page $menuExpanded={menuExpanded}>
        <styles.SettingDiv>
          <SettingsCard />
          <SettingsCard />
          <SettingsCard />
        </styles.SettingDiv>
      </styles.Page>
    </styles.All>
  );
}
