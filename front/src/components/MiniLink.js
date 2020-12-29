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
    color: gray;
    font-size: 16px;
    padding: 0 20px;
    .title {
      margin: 6px 0;
    }
  }
  .edit {
    position: absolute;
    top: 12px;
    right: 10px;
  }
`;

const Thumbnail = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 100%;
  position: relative;
`;

const MiniLink = ({ href, children }) => {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <StyledMiniLink>
          <Thumbnail />
          {children}
        </StyledMiniLink>
      </a>
    );
  }
  return (
    <StyledMiniLink>
      <Thumbnail />
      {children}
    </StyledMiniLink>
  );
};

MiniLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

MiniLink.defaultProps = {
  href: '',
  children: '',
};

export default MiniLink;
