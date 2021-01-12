import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Jumbotron = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <JumbotronContainer>
      {userInfo && `${userInfo?.username}님, 안녕하세요!`}
      {!userInfo && (
        <>
          <H1>필요한 유일한 링크 🌿</H1>
          <H2>단 하나의 링크로 모든 콘텐츠에 연결</H2>
        </>
      )}
    </JumbotronContainer>
  );
};

const JumbotronContainer = styled.div`
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
  font-size: 3.5rem;
  font-weight: bold;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 2rem;
    padding: 1rem;
  }
`;

const H2 = styled.h1`
  color: #fff;
  font-size: 2rem;
  fonte-weight: bold;
  @media screen and ${(props) => props.theme.media.mobile} {
    font-size: 1.5rem;
  }
`;

export default Jumbotron;
