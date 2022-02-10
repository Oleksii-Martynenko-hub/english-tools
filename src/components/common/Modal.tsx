import React, { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  show: boolean;
  onClose: () => void;
  header?: string;
  centered?: boolean;
}

const Modal: React.FC<Props> = (props) => {
  const {
    show, onClose, header, children, centered = false,
  } = props;

  const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    document.body.style.overflow = 'unset';
  };

  const divStyle = {
    display: show ? 'block' : 'none',
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'unset';
  }, [show]);

  return (
    <>
      {show && (
        <Container
          onClick={handleCloseModal}
          style={divStyle}
        >
          <Content centered={centered} onClick={(e) => e.stopPropagation()}>
            <Header>
              <Close onClick={handleCloseModal}>&times;</Close>
              <h2>{header}</h2>
            </Header>
            <Body>
              {children}
            </Body>
          </Content>
        </Container>
      )}
    </>
  );
};

const Body = styled.div`
  padding: 2px 16px;
`;

const Header = styled.div`
  padding: 2px 16px;
  text-align: center;

  h2 {
    font-size: 20px;
  }
`;

const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover, &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Content = styled.div<{centered: boolean}>`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primaryInActive};
  border-radius: 3px;
  width: fit-content;
  position: relative;
  top: ${({ centered }) => (centered ? '50%' : 'unset')};
  transform: ${({ centered }) => (centered ? 'translateY(-50%)' : 'unset')};

  @media(max-width: 730px) {
    width: calc(100% - 40px);
  }
`;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export default Modal;
