import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import styled from 'styled-components';

import SelectLabel from '@/components/common/SelectLabel';

interface IOption {
  value: string;
  key: string;
  disabled?: boolean;
}

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
}

const Select: React.FC<Props> = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  options,
  disabled,
}) => (
  <SelectWrapperStyled>
    <SelectLabel>{label}</SelectLabel>

    <SelectStyled
      value={value}
      showPlaceholder={!value}
      onChange={onChange}
      disabled={disabled || !options.length}
      required={required}
    >
      <OptionStyled value="" disabled>
        {placeholder}
      </OptionStyled>

      {options.map((option, i) => (
        <OptionStyled key={i} value={option.value} disabled={option.disabled}>
          {option.key}
        </OptionStyled>
      ))}
    </SelectStyled>

    <ArrowStyled />
  </SelectWrapperStyled>
);

const SelectWrapperStyled = styled.div`
  position: relative;
`;

const SelectStyled = styled.select<{ showPlaceholder: boolean }>`
  display: block;
  width: 100%;
  height: 48px;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.palette.primaryInActive};
  color: ${({ showPlaceholder, theme }) => showPlaceholder && theme.palette.primaryInActive};

  outline: none;

  padding-left: 15px;
  cursor: pointer;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.palette.primaryInActive};
  }

  &:focus {
    border-color: ${({ theme }) => theme.palette.primaryActive};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.palette.primaryInActive};
    cursor: not-allowed;
    font-style: italic;
  }
`;

const OptionStyled = styled.option``;

const ArrowStyled = styled.div`
  position: absolute;
  top: 55%;
  right: 30px;

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 2px;
    transform: rotate(45deg) translateX(-40%);
    background-color: #333;
  }

  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 2px;
    transform: rotate(-45deg) translateX(40%);
    background-color: #333;
  }
`;

export default Select;
