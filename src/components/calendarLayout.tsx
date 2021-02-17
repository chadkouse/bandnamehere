import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Grommet } from 'grommet';
import customTheme from '../utils/customTheme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    scroll-behavior: smooth;
        overflow-y: scroll;
  }
`;

type Props = {
  children: ReactNode;
};

const CalendarLayout = ({ children }: Props) => (
  <Grommet
    theme={customTheme}
    background={customTheme.global.colors.background}
    full
  >
    <GlobalStyle />
    {children}
  </Grommet>
);

export default CalendarLayout;
