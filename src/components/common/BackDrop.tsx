import React, { useRef, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  onClick: (e: MouseEvent) => void;
}

const BackDrop: React.FC<Props> = ({ children, onClick }) => {
  const backDrop = useRef(null);

  const handleClick = (e: MouseEvent) => {
    if (e.target !== backDrop.current) return;

    onClick(e);
  };

  return (
    <BackDropStyled onClick={handleClick} ref={backDrop}>
      <Wrapper>{children}</Wrapper>
    </BackDropStyled>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const BackDropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-duration: 0.1s;
`;

const Wrapper = styled.div`
  cursor: initial;
`;

export default BackDrop;
