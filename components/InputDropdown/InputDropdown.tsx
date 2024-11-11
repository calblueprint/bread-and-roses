'use client';

import { useCallback, useId, useMemo } from 'react';
import Select, {
  components,
  MenuProps,
  MultiValue,
  SingleValue,
} from 'react-select';
import COLORS from '@/styles/colors';
import { P, SMALL } from '@/styles/text';
import { DropdownOption } from '@/types/dropdown';
import {
  AnimatedWrapper,
  DropdownStyles,
  DropdownWrapper,
  InputLabel,
} from './styles';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: Set<string> | Map<string, string>;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: string | null) => void;
}

type InputDropdownProps = SingleSelectProps | MultiSelectProps;

// custom components
function NoOptionsMessage() {
  return <SMALL $color={COLORS.gray11}>No matches found</SMALL>;
}

function AnimatedMenu(props: MenuProps<DropdownOption>) {
  return (
    <AnimatedWrapper>
      <components.Menu {...props} />
    </AnimatedWrapper>
  );
}

// main dropdown component
export default function InputDropdown({
  label,
  options,
  placeholder = '',
  error = '',
  disabled,
  required,
  onChange,
  multi,
}: InputDropdownProps) {
  const optionsArray = useMemo(
    () =>
      options instanceof Set
        ? Array.from(options).map(v => ({ label: v, value: v }))
        : Array.from(options.entries()).map(([k, v]) => ({
            value: k,
            label: v,
          })),
    [options],
  );

  const handleChange = useCallback(
    (newValue: MultiValue<DropdownOption> | SingleValue<DropdownOption>) => {
      if (multi && newValue instanceof Array) {
        onChange?.(new Set(newValue.map(v => v.value)));
      } else if (!multi && !(newValue instanceof Array)) {
        onChange?.(newValue ? newValue.value : null);
      } else {
        throw new Error('An unexpected error occurred!');
      }
    },
    [multi, onChange],
  );

  return (
    <DropdownWrapper>
      <InputLabel>
        <P $color={COLORS.gray11}>{label}</P>
        {required && <SMALL $color={COLORS.rose10}>{'*'}</SMALL>}
      </InputLabel>
      <Select
        components={{ Menu: AnimatedMenu }}
        isClearable
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        hideSelectedOptions={false}
        noOptionsMessage={NoOptionsMessage}
        unstyled
        required={required}
        isDisabled={disabled}
        styles={DropdownStyles(multi, error !== '')}
        instanceId={useId()}
        options={optionsArray}
        placeholder={placeholder}
        isMulti={multi}
        onChange={handleChange}
      />
      {error && <SMALL $color={COLORS.rose10}>{error}</SMALL>}
    </DropdownWrapper>
  );
}
