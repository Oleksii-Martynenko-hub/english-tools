import React from 'react';
import styled from 'styled-components';

const FormTitle: React.FC = ({ children }) => <FormTitleStyled>{children}</FormTitleStyled>;

const FormTitleStyled = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

export default FormTitle;
