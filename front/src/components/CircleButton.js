import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const StyledCircleButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    opacity: 0.8;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: ${props.theme.color.primary};
        color: #fff;
    `;
    }
    return `
      background: ${props.theme.color.gray};
      color: #000;
    `;
  }}
`;

const CircleButton = ({ outsite, icon, href, onClick, primary }) => {
  if (outsite && href) {
    return (
      <a href={href}>
        <StyledCircleButton type="button" primary={primary}>
          {icon}
        </StyledCircleButton>
      </a>
    );
  }
  if (!outsite && href) {
    return (
      <Link href={href}>
        <StyledCircleButton type="button" primary={primary}>
          {icon}
        </StyledCircleButton>
      </Link>
    );
  }
  return (
    <StyledCircleButton type="button" primary={primary} onClick={onClick}>
      {icon}
    </StyledCircleButton>
  );
};

CircleButton.propTypes = {
  outsite: PropTypes.bool,
  icon: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
};

CircleButton.defaultProps = {
  outsite: false,
  icon: '',
  href: null,
  onClick: null,
  primary: false,
};

export default CircleButton;
