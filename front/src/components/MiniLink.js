import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMiniLink = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  align-items: center;
  background: #fff;
  overflow: hidden;
  position: relative;
  .content {
    text-align: left;
    color: ${(props) => props.theme.color.darkgray};
    font-size: 16px;
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    @media screen and ${(props) => props.theme.media.mobile} {
      font-size: 14px;
    }
  }
  .title {
    display: inline;
    padding: 0.5rem 1rem;
    background: #fff;
    max-width: 80%;
    line-height: 1.8;
    white-space: pre-wrap;
  }
  .detail {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: 0;
    padding: 1rem;
    color: ${(props) => props.theme.color.darkgray};
  }
  .click {
    padding: 7px 10px;
    border-radius: 16px;
    font-size: 14px;
    background: #fff;
    .count {
      margin: 0 5px;
    }
  }
  .edit {
    position: absolute;
    top: 12px;
    right: 10px;
  }
`;

const Thumbnail = styled.div`
  background: ${(props) => props.theme.color.gray};
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
`;

const MiniLink = ({ name, imageURL, children }) => (
  <StyledMiniLink>
    <Thumbnail imageURL={imageURL} />
    {children}
    <div className="content">
      <div className="title">{name}</div>
    </div>
  </StyledMiniLink>
);

MiniLink.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
  children: PropTypes.node,
};

MiniLink.defaultProps = {
  name: '',
  imageURL: '',
  children: null,
};

export default MiniLink;
