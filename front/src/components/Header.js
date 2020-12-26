import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from './Button';

const Logo = styled.img`
  width: 200px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-dirction: row;
  padding: 20px;
  margin: 0 auto;
  max-width: ${(props) => props.theme.size.desktop}px;
  justify-content: space-between;
  ${Button} {
    margin-left: 10px;
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo src="/image/logo.png" alt="mini-link" />

    <div>
      <Link href="/user/login">
        <Button>로그인</Button>
      </Link>
      <Link href="/user/signup">
        <Button primary>무료회원가입</Button>
      </Link>
    </div>
  </HeaderContainer>
);

export default Header;
