import React from 'react';

import Signin from './pages/Signin';
import GlobalStyle from './styles/global';
import AuthContext from './context/auth-context';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Gabriel' }}>
        <Signin />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  );
};

export default App;
