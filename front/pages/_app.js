import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/style/global';
import theme from '../src/style/theme';

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
