import React from 'react';
import styled from 'styled-components';

interface Props {
  isError?: boolean;
  isResolved?: boolean;
}

const FormInfo: React.FC<Props> = ({ isError = false, isResolved = false, children }) => {
  if (!isError && !isResolved) return null;

  return <FormErrorStyled isError={isError}>{children}</FormErrorStyled>;
};

const FormErrorStyled = styled.div<{ isError: boolean }>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: calc(100% - 20px);

  color: ${({ isError }) => (isError ? 'red' : 'green')};
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: capitalize;
`;

export default FormInfo;
