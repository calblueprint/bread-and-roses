import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Availability from '@/public/images/availabilities.svg';
import Discover from '@/public/images/discover.svg';
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

const MenuBar: React.FC<{ setMenuExpanded?: (expanded: boolean) => void }> = ({
  setMenuExpanded = () => {}, // Default to a no-op function
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    setMenuExpanded(newExpanded); // Update parent component about expanded state
  };

  const handleClick = (item: string, path: string) => {
    setActiveItem(item);
    router.push(path);
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
            onClick={() => handleClick('discover', '/discover')}
          >
            <Icon src={Discover} alt="Discover icon" />
            <MenuLabel $expanded={expanded} $active={activeItem === 'discover'}>
              Discover
            </MenuLabel>
          </MenuItem>
          <MenuItem
            $expanded={expanded}
            onClick={() =>
              handleClick('availabilities', '/availability/general')
            }
          >
            <Icon src={Availability} alt="Availabilities icon" />
            <MenuLabel
              $expanded={expanded}
              $active={activeItem === 'availabilities'}
            >
              Availabilities
            </MenuLabel>
          </MenuItem>
          <MenuItem
            $expanded={expanded}
            onClick={() => handleClick('events', '/events')}
          >
            <Icon src={Events} alt="Events icon" />
            <MenuLabel $expanded={expanded} $active={activeItem === 'events'}>
              My Events
            </MenuLabel>
          </MenuItem>
          <MenuItem
            $expanded={expanded}
            onClick={() => handleClick('settings', '/settings')}
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
