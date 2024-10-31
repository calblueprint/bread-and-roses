import React, { useState } from 'react';
import Availability from '@/public/images/availabilities.svg';
import Settings from '@/public/images/settings.svg';
import Events from '@/public/images/upcoming-events.svg';
import {
  Icon,
  MenuContainer,
  MenuIconWrapper,
  MenuItem,
  MenuLabel,
  ToggleButton,
} from './styles';

const MenuBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleMenu = () => setExpanded(!expanded);

  // TODO: add navigation by passing in path prop
  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <MenuContainer $expanded={expanded}>
      <ToggleButton onClick={toggleMenu}>
        <MenuIconWrapper $expanded={expanded}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
              fill="currentColor"
            />
          </svg>
        </MenuIconWrapper>
      </ToggleButton>
      {expanded && (
        <>
          <MenuItem
            $expanded={expanded}
            onClick={() => handleClick('availabilities')}
          >
            <Icon src={Availability} alt="Availabilities icon" />
            <MenuLabel
              $expanded={expanded}
              $active={activeItem === 'availabilities'}
            >
              Availabilities
            </MenuLabel>
          </MenuItem>
          <MenuItem $expanded={expanded} onClick={() => handleClick('events')}>
            <Icon src={Events} alt="Events icon" />
            <MenuLabel $expanded={expanded} $active={activeItem === 'events'}>
              Upcoming Events
            </MenuLabel>
          </MenuItem>
          <MenuItem
            $expanded={expanded}
            onClick={() => handleClick('settings')}
          >
            <Icon src={Settings} alt="Settings icon" />
            <MenuLabel $expanded={expanded} $active={activeItem === 'settings'}>
              Profile & Settings
            </MenuLabel>
          </MenuItem>
        </>
      )}
    </MenuContainer>
  );
};

export default MenuBar;
