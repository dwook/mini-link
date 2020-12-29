import baseStyled, { css, ThemedStyledInterface } from 'styled-components';

const size = {
  mobile: 576,
  tablet: 778,
  desktop: 1024,
};

const media = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  desktop: `(max-width: ${size.desktop}px)`,
};

const color = {
  red: '#ff525c',
  orange: '#fc6b01',
  blue: '#0983ff',
  green: '#0ac67d',
  yellow: '#ffce00',
  black: '#000000',
  gray: '#e5e7e8',
  primary: '#ff525c',
};

const theme = {
  size,
  media,
  color,
};

export default theme;
