import baseStyled, { css, ThemedStyledInterface } from 'styled-components';

const size = {
  mobile: 576,
  tablet: 778,
  desktop: 1024,
};

const media = {
  mobile: `(min-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
};

const color = {
  red: '#ff5102',
  blue: '#2d41ff',
  green: '#00ad61',
  yellow: '#ffce00',
  black: '#000000',
  gray: '#e5e7e8',
  primary: '#ff5102',
};

const theme = {
  size,
  media,
  color,
};

export default theme;
