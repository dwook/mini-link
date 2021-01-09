import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMiniLink = styled.div`
  height: 82px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  .content {
    text-align: left;
    color: ${(props) => props.theme.color.darkgray};
    font-size: 16px;
    padding: 0 20px;
  }
  .title {
    margin: 5px 0 10px;
    span {
      margin: 0 10px;
    }
  }
  .detail {
    display: flex;
    align-items: center;
  }
  .click {
    font-size: 14px;
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
  width: 80px;
  height: 100%;
  position: relative;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
`;

const MiniLink = ({ href, imageURL, children }) => {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <StyledMiniLink>
          <Thumbnail imageURL={imageURL} />
          {children}
        </StyledMiniLink>
      </a>
    );
  }
  return (
    <StyledMiniLink>
      <Thumbnail imageURL={imageURL} />
      {children}
    </StyledMiniLink>
  );
};

MiniLink.propTypes = {
  href: PropTypes.string,
  imageURL: PropTypes.string,
  children: PropTypes.node,
};

MiniLink.defaultProps = {
  href: '',
  imageURL: PropTypes.string,
  children: '',
};

export default MiniLink;
