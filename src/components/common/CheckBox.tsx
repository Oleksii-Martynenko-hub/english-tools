import React from 'react';
import styled from 'styled-components';

interface Props {
  isOn: boolean;
}

const CheckBox: React.FC<Props> = ({ isOn }) => (
  <CheckBoxStyled isOn={isOn}>{isOn && <CheckIcon />}</CheckBoxStyled>
);

const CheckBoxStyled = styled.div<{ isOn: boolean }>`
  margin: auto;
  max-height: 18px;
  height: 18px;
  min-height: 18px;
  max-width: 18px;
  width: 18px;
  min-width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid
    ${({ isOn, theme }) => (isOn ? theme.palette.primaryActive : theme.palette.primaryInActive)};
  background-color: ${({ isOn, theme }) => (isOn ? theme.palette.primaryActive : 'white')};
  cursor: pointer;
`;

const CheckIcon = styled.div`
  width: 10px;
  height: 10px;
  mask-image: url('/assets/img/check.svg');
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  background-color: white;
`;

export default CheckBox;
