import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const JumbotronContainer = styled.div`
  width: 100%;
  height: 270px;
  background-color: ${(props) => props.theme.color.primary};
`;

const Jumbotron = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <JumbotronContainer>
      {userInfo && `${userInfo?.username}님, 안녕하세요!`}
    </JumbotronContainer>
  );
};

export default Jumbotron;
