import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
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

const Header = styled.div`
  background-color: ${(props) => props.theme.color.yellow};
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin-bottom: 20px;
`;

const Admin = () => {
  const dispatch = useDispatch();
  const { userLinks, deleteLinkDone } = useSelector((state) => state.link);
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

  return (
    <>
      <Header>
        <CoverImage>
          <CoverButtonList>
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
              <MiniLink key={link.id}>
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
