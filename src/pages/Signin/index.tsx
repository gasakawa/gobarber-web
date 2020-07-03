import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import * as S from './styles';

const Signin: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="GoBarber" />
        <form>
          <h1>Faça seu logon</h1>
          <input type="text" name="email" id="email" placeholder="E-mail" />
          <input type="password" name="password" id="password" placeholder="Senha" />

          <button type="submit">Entrar</button>

          <a href="/forgot">Esqueci minha senha</a>
        </form>
        <a href="lll">
          <FiLogIn />
          Criar conta
        </a>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default Signin;
