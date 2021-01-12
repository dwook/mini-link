import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../../feature/User/slice';
import Button from './Button';
import Logo from '../icons/Logo';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 0 auto;
  max-width: ${(props) => props.theme.size.desktop}px;
  justify-content: space-between;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;

const Header = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(userAction.logOutRequest());
  };
  return (
    <HeaderContainer>
      <Link href="/">
        <a>
          <Logo width={140} />
        </a>
      </Link>
      <div>
        {userInfo && (
          <>
            <Button onClick={onLogoutClick}>로그아웃</Button>
            <Link href="/admin">
              <a>
                <Button primary>관리자</Button>
              </a>
            </Link>
          </>
        )}
        {!userInfo && (
          <>
            <Link href="/user/login">
              <a>
                <Button>로그인</Button>
              </a>
            </Link>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
