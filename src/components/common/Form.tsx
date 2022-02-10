import React, { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends FormHTMLAttributes<HTMLFormElement> {}

const Form: React.FC<Props> = (props) => <FormStyled {...props} />;

const FormStyled = styled.form`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 40px);
  overflow-y: auto;

  background-color: white;

  padding: 35px;

  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.palette.primaryInActive};

  @media(max-width: 380px) {
    padding: 25px;
  }
`;

export default Form;
