import React from 'react';

import Signin from './pages/Signin';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/auth-context';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
