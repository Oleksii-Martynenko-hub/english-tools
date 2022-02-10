import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Name: React.FC<Props> = (props) => {
  const { isLoading, disabled, children } = props;

  return (
    <BtnStyled {...props} disabled={disabled || isLoading}>
      {isLoading ? 'Loading...' : children}
    </BtnStyled>
  );
};

const BtnStyled = styled.button<{ isLoading?: boolean }>`
  display: block;
  width: 100%;
  height: 48px;

  color: white;

  border: none;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.palette.primary};

  outline: none;

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.75;
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.primaryActive};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.primaryInActive};
    cursor: not-allowed;
  }
`;

export default Name;
