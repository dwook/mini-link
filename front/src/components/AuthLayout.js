import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ArrowLeft from '../icon/ArrowLeft';

const Container = styled.div`
  max-width: 600px;
  padding-top: 20px;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    padding: 20px 20px 0;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  button {
    position: absolute;
    top: 0;
    left: 0;
    padding: 2px;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  font-size: 24px;
  text-align: center;
`;

const Layout = ({ children, title }) => {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <Container>
      <Top>
        <button type="button" onClick={goBack}>
          <ArrowLeft />
        </button>
        <Title>{title}</Title>
      </Top>
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.elementType.isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
};

export default Layout;
