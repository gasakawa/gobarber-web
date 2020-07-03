import React from 'react';

import Signin from './pages/Signin';
import GlobalStyle from './styles/global';
import { AuthProvider } from './hooks/auth-context';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>

      <ToastContainer />
      <GlobalStyle />
    </>
  );
};

export default App;
