import React from 'react';
import {
  Button,
  ButtonContainer,
  ButtonText,
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

export default function FilterMenu({
  filters,
  onClear,
  onApply,
}: {
  filters: Filter[];
  onClear: () => void;
  onApply: () => void;
}) {
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
              <Input
                key={option}
                data-label={option}
                onClick={() => handleSelectOption(option, value, onChange)}
              >
                <Checkbox checked={value.has(option)} />
              </Input>
            ))}
          </InputContainer>
        </IndividualFilterContainer>
      ))}
      <ButtonContainer>
        <Button onClick={onApply}>
          <ButtonText>Apply</ButtonText>
        </Button>
        <Button onClick={onClear}>
          <ButtonText>Clear</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
