import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { userAction } from '../feature/User/slice';
import { linkAction } from '../feature/Link/slice';
import { homeAction } from '../feature/Home/slice';
import MiniLink from '../src/components/MiniLink';
import {
  CoverImage,
  CoverButtonList,
  CoverButton,
} from '../src/components/CoverImage';
import Button from '../src/components/Button';
import CircleButton from '../src/components/CircleButton';
import Badge from '../src/components/Badge';
import { Edit, Delete } from '../src/icons';
import { backURL } from '../config';

const Header = styled.div`
  background-color: ${(props) => props.mainColor || props.theme.color.yellow};
  height: 240px;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  & + & {
    border-top: 1px solid rgba(238, 245, 250);
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin-bottom: 20px;
`;

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userLinks, deleteLinkDone } = useSelector((state) => state.link);
  const { selectedHome } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(linkAction.getLinksRequest());
  }, [deleteLinkDone]);
  useEffect(() => {
    dispatch(homeAction.getHomeRequest());
  }, []);

  const onDeleteClick = (id) => () => {
    dispatch(linkAction.deleteLinkRequest(id));
  };

  const onLogoutClick = () => {
    dispatch(userAction.logOutRequest());
    router.push('/');
  };

  return (
    <>
      <Header mainColor={selectedHome?.mainColor}>
        <CoverImage imageURL={`'${backURL}/${selectedHome?.coverImage}'`}>
          <CoverButtonList>
            <CoverButton onClick={onLogoutClick}>로그아웃</CoverButton>
            <CoverButton href={`/home/${userInfo?.id}`}>
              커버 수정하기
            </CoverButton>
          </CoverButtonList>
        </CoverImage>
      </Header>
      <Content>
        <Section>
          <Title>링크 추가하기</Title>
          <Link href="/link/create">
            <a>
              <Button big primary full>
                새로운 링크 추가하기
              </Button>
            </a>
          </Link>
        </Section>
        <Section>
          <Title>링크 관리하기</Title>
          {userLinks &&
            userLinks.map((link) => (
              <MiniLink key={link.id} imageURL={`'${backURL}/${link.image}'`}>
                <div className="content">
                  <p className="title">{link.name}</p>
                  {link.public ? (
                    <Badge primary text="공개" />
                  ) : (
                    <Badge text="비공개" />
                  )}
                </div>
                <div className="edit">
                  <CircleButton
                    icon={<Edit />}
                    href={`/link/${link.id}`}
                    outsite
                  />
                  <CircleButton
                    icon={<Delete />}
                    onClick={onDeleteClick(link.id)}
                  />
                </div>
              </MiniLink>
            ))}
        </Section>
      </Content>
    </>
  );
};

export default Admin;
