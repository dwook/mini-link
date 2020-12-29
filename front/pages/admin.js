import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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

const Admin = () => (
  <>
    <Header>
      <CoverImage>
        <CoverButtonList>
          <CoverButton href="/user/edit">커버 수정하기</CoverButton>
        </CoverButtonList>
      </CoverImage>
    </Header>
    <Content>
      <Section>
        <Title>링크 추가하기</Title>
        <Link href="/link/create">
          <Button big primary>
            새로운 링크 추가하기
          </Button>
        </Link>
      </Section>
      <Section>
        <Title>링크 관리하기</Title>
        <MiniLink>
          <div className="content">
            <p className="title">링크</p>
            <Badge primary text="공개" />
          </div>
          <div className="edit">
            <CircleButton icon={<Edit />} href="/link/edit" />
            <CircleButton icon={<Delete />} />
          </div>
        </MiniLink>
        <MiniLink>
          <div className="content">
            <p className="title">링크</p>
            <Badge text="비공개" />
          </div>
          <div className="edit">
            <CircleButton icon={<Edit />} href="/link/edit" />
            <CircleButton icon={<Delete />} />
          </div>
        </MiniLink>
        <MiniLink>
          <div className="content">
            <p className="title">링크</p>
            <Badge primary text="공개" />
          </div>
          <div className="edit">
            <CircleButton icon={<Edit />} />
            <CircleButton icon={<Delete />} />
          </div>
        </MiniLink>
      </Section>
    </Content>
  </>
);

export default Admin;
