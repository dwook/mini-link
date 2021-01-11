import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';
import wrapper from '../store';
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

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userLinks, deleteLinkDone } = useSelector((state) => state.link);
  const { userInfo, getMyInfoDone } = useSelector((state) => state.user);
  const { selectedHome } = useSelector((state) => state.home);
  const fetcher = (url) => axios.get(url).then((result) => result.data);
  const { data: visit, error } = useSWR(
    `${backURL}/visit?homeId=${selectedHome?.id}`,
    fetcher
  );

  useEffect(() => {
    dispatch(userAction.getMyInfoRequest());
  }, []);
  useEffect(() => {
    if (userInfo) {
      dispatch(homeAction.getHomeRequest(userInfo?.username));
    }
  }, [getMyInfoDone]);
  useEffect(() => {
    if (userInfo) {
      dispatch(linkAction.getLinksRequest(userInfo?.username));
    }
  }, [getMyInfoDone, deleteLinkDone]);
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  }, [userInfo]);

  const onDeleteClick = (id) => () => {
    dispatch(linkAction.deleteLinkRequest(id));
  };

  const onLogoutClick = () => {
    dispatch(userAction.logOutRequest());
  };

  return (
    <>
      <Header mainColor={selectedHome?.mainColor}>
        <CoverImage imageURL={selectedHome?.coverImage}>
          <CoverButtonList>
            <CoverButton onClick={onLogoutClick}>로그아웃</CoverButton>
            <CoverButton href={`/home/${userInfo?.id}`}>
              커버 수정하기
            </CoverButton>
          </CoverButtonList>
        </CoverImage>
      </Header>
      <VisitBanner>
        <div className="container">
          <span>
            <span className="title">총 방문자</span>
            <span className="count">{visit?.totalCount}</span>
          </span>
          <span>
            <span className="title">오늘 방문자</span>
            <span className="count">{visit?.todayCount}</span>
          </span>
        </div>
      </VisitBanner>
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
              <MiniLink key={link.id} imageURL={link.image}>
                <div className="content">
                  <div className="title">
                    {link.public ? (
                      <Badge primary text="공개" />
                    ) : (
                      <Badge text="비공개" />
                    )}
                    <span>{link.name}</span>
                  </div>
                  <div className="detail">
                    <div className="click">
                      클릭수<span className="count">{link.VisitCount}</span>
                    </div>
                  </div>
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

const VisitBanner = styled.div`
  background-color: ${(props) => props.theme.color.gray};
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .title {
    font-weight: bold;
  }
  .count {
    padding: 0 20px 0 10px;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
      context.store.dispatch(userAction.getMyInfoRequest());
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/user/login',
        },
      };
    }
  }
);

export default Admin;
