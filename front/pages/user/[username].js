import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MiniLink from '../../src/components/MiniLink';
import {
  CoverImage,
  CoverButtonList,
  CoverButton,
} from '../../src/components/CoverImage';
import { Logo, Home, Instagram, Youtube, Share } from '../../src/icons';

const Header = styled.div`
  background-color: ${(props) => props.theme.color.yellow};
  height: 240px;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  @media screen and ${(props) => props.theme.media.mobile} {
    padding: 0 20px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MiniHome = () => (
  <>
    <Header>
      <CoverImage>
        <CoverButtonList>
          <CoverButton outsite icon={<Home />} href="/" />
          <CoverButton outsite icon={<Instagram />} href="/" />
          <CoverButton outsite icon={<Youtube />} href="/" />
          <CoverButton icon={<Share />} />
        </CoverButtonList>
      </CoverImage>
    </Header>
    <Content>
      <MiniLink href="/">
        <div className="content">
          <div className="title">링크</div>
        </div>
      </MiniLink>
      <MiniLink href="/">
        <div className="content">
          <div className="title">링크</div>
        </div>
      </MiniLink>
      <MiniLink href="/">
        <div className="content">
          <div className="title">링크</div>
        </div>
      </MiniLink>
    </Content>
    <Footer>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </Footer>
  </>
);

export default MiniHome;
