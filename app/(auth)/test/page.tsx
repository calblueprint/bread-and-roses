'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import { P } from '@/styles/text';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4rem 0;
`;
const Box = styled.div`
  width: 31.25rem;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const elementOptions = new Set([
  'Argon',
  'Berkelium',
  'Carbon',
  'Darmstadtium',
  'Einsteinium',
  'Fluorine',
  'Gold',
  'Helium',
  'Iron',
  'Krypton',
  'Lithium',
  'Magnesium',
  'Neon',
  'Oxygen',
  'Phosphorus',
  'Radium',
  'Silicon',
  'Titanium',
  'Uranium',
  'Vanadium',
  'Xenon',
  'Ytterbium',
  'Zinc',
]);
const disasterOptions = new Set([
  'Avalanche',
  'Blizzard',
  'Cyclone',
  'Drought',
  'Earthquake',
  'Flood',
  'Hurricane',
  'Ice storm',
  'Landslide',
  'Pandemic',
  'Ragnorak',
  'Sinkhole',
  'Tsunami',
  'Volcanic Eruption',
  'Wildfire',
]);
const emptyOptions = new Set([]);
export default function Page() {
  const [elements, setElements] = useState<Set<string>>(new Set());
  const [disaster, setDisaster] = useState<string | null>(null);
  const [valuesVisible, setValuesVisible] = useState<boolean>(false);
  useEffect(() => {
    if (elements.size === 0 || !disaster) setValuesVisible(false);
  }, [elements, disaster]);
  return (
    <Container>
      <Box>
        <InputDropdown
          label="Elements"
          placeholder="Nitrogen"
          multi
          required
          onChange={v => setElements(v)}
          options={elementOptions}
        />
        <InputDropdown
          label="Natural Disaster"
          placeholder="Hurricane"
          error="Insufficient funds"
          onChange={v => setDisaster(v)}
          options={disasterOptions}
        />
        <InputDropdown label="Disabled" disabled options={emptyOptions} />
        {valuesVisible && (
          <P>
            {Array.from(elements).join(', ')} {disaster}
          </P>
        )}
      </Box>
    </Container>
  );
}
