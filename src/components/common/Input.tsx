import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => <InputStyled {...props} />;

const InputStyled = styled.input`
  display: block;
  width: 100%;
  height: 48px;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.palette.primaryInActive};

  outline: none;

  padding-left: 15px;

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
    background-color: #ecf0f1;
  }
`;

export default Input;
