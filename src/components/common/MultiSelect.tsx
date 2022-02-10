import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import SelectLabel from '@/components/common/SelectLabel';

export interface IOption {
  id: string | number;
  state: boolean;
  name: string;
}

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder: string;
  options: IOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isLoading?: boolean;
}

const MultiSelect: React.FC<Props> = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  options,
  disabled,
}) => {
  const isEmpty = !options.length;
  const idDisabled = isEmpty || disabled;

  return (
    <MultiSelectStyled>
      <SelectLabel>{label}</SelectLabel>
      <SelectLabel side="right">Click + (CMD | CTRL)</SelectLabel>

      <SelectStyled
        value={value}
        onChange={onChange}
        multiple
        disabled={idDisabled}
        required={required}
        isEmpty={isEmpty}
      >
        {isEmpty && (
          <OptionStyled value="" disabled>
            {placeholder}
          </OptionStyled>
        )}

        {options.map((option, i) => (
          <OptionStyled disabled={idDisabled} key={i} value={option.id}>
            {option.name}
          </OptionStyled>
        ))}
      </SelectStyled>
    </MultiSelectStyled>
  );
};

const MultiSelectStyled = styled.div`
  position: relative;
`;

const SelectStyled = styled.select<{ isEmpty: boolean }>`
  display: block;
  width: 100%;
  max-height: ${({ isEmpty }) => (isEmpty ? '48px' : '144px')};

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.palette.primaryInActive};

  outline: none;

  cursor: pointer;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.palette.primaryActive};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.palette.primaryInActive};
    cursor: not-allowed;
    font-style: italic;
  }
`;

const OptionStyled = styled.option`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primaryInActive};

  &:last-child {
    border-bottom: none;
  }

  &:disabled {
    cursor: not-allowed;
    font-style: italic;
    color: ${({ theme }) => theme.palette.primaryInActive};
  }
`;

export default MultiSelect;
