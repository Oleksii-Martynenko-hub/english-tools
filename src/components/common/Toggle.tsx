import React, { MouseEvent } from 'react';
import styled from 'styled-components';

interface Props {
  isOn: boolean;
  toggle: (e: MouseEvent) => void;
  disabled?: boolean;
}

const Toggle: React.FC<Props> = ({ isOn, toggle, disabled }) => {
  const handleClick = (e: MouseEvent) => {
    if (disabled) return;

    toggle(e);
  };

  return (
    <ToggleStyled isOn={isOn} disabled={!!disabled} onClick={handleClick}>
      <BallStyled isOn={isOn} />
    </ToggleStyled>
  );
};

const ToggleStyled = styled.div<{ isOn: boolean, disabled: boolean }>`
  width: 36px;
  height: 19px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  border: 1px solid
    ${({ isOn, theme }) => (isOn ? theme.palette.primaryActive : theme.palette.primaryInActive)};
  background-color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'cursor')};
  transition: 0.1s;
`;

const BallStyled = styled.div<{ isOn: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ isOn, theme }) => (
    isOn ? theme.palette.primaryActive : theme.palette.primaryInActive)};
  margin-left: 1px;
  transform: ${({ isOn }) => (isOn ? 'translateX(17px)' : 'translateX(0px)')};
  transition: 0.1s;
`;

export default Toggle;
