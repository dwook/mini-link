import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from './Button';
import Logo from '../icons/Logo';

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
    <Link href="/">
      <a>
        <Logo width={200} />
      </a>
    </Link>
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
