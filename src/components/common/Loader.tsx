import React from 'react';
import styled from 'styled-components';

interface Props {
  style?: {
    width: number,
    height: number,
    marginRight: number,
  };
}

const Loader: React.FC<Props> = ({ style }) => <LoaderStyled style={style} />;

const LoaderStyled = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/assets/img/loader.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Loader;
