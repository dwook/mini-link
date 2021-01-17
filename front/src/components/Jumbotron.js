import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledJumbotron = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  flex-direction: column;
  width: 100%;
  height: 270px;
  background-color: ${(props) => props.theme.color.primary};
  text-align: center;
`;

const H1 = styled.h1`
  color: #fff;
  padding: 1.5rem;
  font-size: 3rem;
  font-weight: bold;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

const H2 = styled.h1`
  color: #fff;
  font-size: 2rem;
  line-height: 1.2;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 1.2rem;
  }
`;

const Jumbotron = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <StyledJumbotron>
      {userInfo && `${userInfo?.username}님, 안녕하세요!`}
      {!userInfo && (
        <>
          <H1>💛 한번에 보여주는 멀티링크 🌿</H1>
          <H2>전달하고 싶은 모든 링크를 한페이지에 담아요!</H2>
        </>
      )}
    </StyledJumbotron>
  );
};

export default Jumbotron;
