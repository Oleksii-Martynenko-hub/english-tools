import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  className: string;
}

const Typing: React.FC<Props> = ({ ...props }) => {
  return (
    <TypingStyled {...props}>
      <Dot delay={0}>.</Dot>
      <Dot delay={0.1}>.</Dot>
      <Dot delay={0.2}>.</Dot>
    </TypingStyled>
  );
};

const TypingStyled = styled.span`
  display: inline-block;
`;

const slideTop = keyframes`
  50% { color: transparent; }
`;

const Dot = styled.span<{ delay: number }>`
  display: inline-block;
  color: black;
  animation: ${slideTop} 0.6s ${({ delay }) => delay}s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
`;

export default Typing;
