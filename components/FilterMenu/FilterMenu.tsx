import React from 'react';
import {
  Checkbox,
  Container,
  Divider,
  IndividualFilterContainer,
  Input,
  InputContainer,
  Title,
} from './styles';

interface Filter {
  options: Set<string>;
  placeholder: string;
  value: Set<string>;
  onChange: (newValue: Set<string>) => void;
}

export default function FilterMenu({ filters }: { filters: Filter[] }) {
  const handleSelectOption = (
    option: string,
    currentValue: Set<string>,
    onChange: (newValue: Set<string>) => void,
  ) => {
    const copy = new Set(currentValue);
    if (copy.has(option)) {
      copy.delete(option);
    } else {
      copy.add(option);
    }
    onChange(copy);
  };

  return (
    <Container>
      {filters.map(({ placeholder, options, value, onChange }) => (
        <IndividualFilterContainer key={placeholder}>
          <Title>{placeholder}</Title>
          <Divider />
          <InputContainer>
            {[...options].map(option => (
              <Input key={option} data-label={option}>
                <Checkbox
                  onChange={() => handleSelectOption(option, value, onChange)}
                />
              </Input>
            ))}
          </InputContainer>
        </IndividualFilterContainer>
      ))}
    </Container>
  );
}
