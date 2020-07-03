import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';
import * as S from './styles';

const Signup: React.FC = () => {
  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <img src={logo} alt="GoBarber" />
        <form>
          <h1>Faça seu cadastro</h1>
          <Input type="text" name="name" id="name" placeholder="Nome" icon={FiUser} />

          <Input type="text" name="email" id="email" placeholder="E-mail" icon={FiMail} />
          <Input type="password" name="password" id="password" placeholder="Senha" icon={FiLock} />

          <Button type="submit">Cadastrar</Button>
        </form>
        <a href="lll">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </S.Content>
    </S.Container>
  );
};

export default Signup;
