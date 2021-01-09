import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import MiniLink from '../../src/components/MiniLink';

import {
  CoverImage,
  CoverButtonList,
  CoverButton,
} from '../../src/components/CoverImage';
import { Home, Instagram, Youtube, Share } from '../../src/icons';
import { backURL } from '../../config';

const Header = styled.div`
  background-color: ${(props) => props.mainColor || props.theme.color.yellow};
  height: 240px;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
  @media screen and ${(props) => props.theme.media.mobile} {
    padding: 0 20px;
  }
`;

const MiniHome = ({ miniHome, miniLinks, username }) => {
  const [ip, setIp] = useState(null);

  const onClickHandler = useCallback(
    (linkId) => () => {
      axios.post(`${backURL}/visit?linkId=${linkId}&ip=${ip}`);
    },
    []
  );

  useEffect(async () => {
    const data = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => res.ip);
    setIp(data);
    if (data) {
      axios.post(`${backURL}/visit?homeId=${miniHome.id}&ip=${ip}`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{username} 미니링크</title>
        <meta property="og:title" content={`${username} 미니링크`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${backURL}/${username}`} />
        <meta
          property="og:image"
          content={`${backURL}/${miniHome.coverImage}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header mainColor={miniHome.mainColor}>
        <CoverImage imageURL={`${backURL}/${miniHome.coverImage}`}>
          <CoverButtonList>
            <CoverButton outsite icon={<Home />} href={miniHome.website} />
            <CoverButton
              outsite
              icon={<Instagram />}
              href={miniHome.instagram}
            />
            <CoverButton outsite icon={<Youtube />} href={miniHome.youtube} />
            <CoverButton icon={<Share />} />
          </CoverButtonList>
        </CoverImage>
      </Header>
      <Content>
        {miniLinks &&
          miniLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.id}
            >
              <MiniLink
                imageURL={`'${backURL}/${link.image}'`}
                onClick={onClickHandler(link.id)}
              >
                <div className="content">
                  <p className="title">{link.name}</p>
                </div>
              </MiniLink>
            </a>
          ))}
      </Content>
    </>
  );
};

MiniHome.propTypes = {
  miniHome: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  miniLinks: PropTypes.array,
};

MiniHome.defaultProps = {
  miniLinks: [],
};

const fetcher = (url) => axios.get(url).then((result) => result.data);

export async function getServerSideProps(context) {
  const user = await axios.post('/user/check', {
    username: context.params.username,
  });

  if (user.data) {
    const GET_HOME_DATA_URL = `${backURL}/home/${context.params.username}`;
    const GET_LINKS_DATA_URL = `${backURL}/link?username=${context.params.username}&public=1`;
    const homeData = await fetcher(GET_HOME_DATA_URL);
    const linkData = await fetcher(GET_LINKS_DATA_URL);

    return {
      props: {
        miniHome: homeData,
        miniLinks: linkData,
        username: context.params.username,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
}

export default MiniHome;