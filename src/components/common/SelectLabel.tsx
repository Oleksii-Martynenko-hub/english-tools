import React from 'react';
import styled from 'styled-components';

type Side = 'left' | 'right';

interface Props {
  side?: Side;
}

const Label: React.FC<Props> = ({ children, side = 'left' }) => (
  <LabelStyled side={side}>{children}</LabelStyled>
);

const LabelStyled = styled.div<{ side: Side }>`
  position: absolute;
  z-index: 1;
  top: -5px;
  ${({ side }) => (side === 'left' ? 'left: 12.5px' : 'right: 12.5px')};
  background-color: white;
  padding: 0 2.5px;
  font-size: 11px;
`;

export default Label;
