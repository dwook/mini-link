import React from 'react';
import styled from 'styled-components';

const JumbotronContainer = styled.div`
  width: 100%;
  height: 270px;
  background-color: ${(props) => props.theme.color.primary};
`;

const Jumbotron = () => <JumbotronContainer />;

export default Jumbotron;
