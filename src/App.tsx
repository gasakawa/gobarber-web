import React from 'react';

import Signin from './pages/Signin';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Signin />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
