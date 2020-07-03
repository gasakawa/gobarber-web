import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';
import * as S from './styles';

const Signup: React.FC = () => {
  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <img src={logo} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input type="text" name="name" id="name" placeholder="Nome" icon={FiUser} />

          <Input type="text" name="email" id="email" placeholder="E-mail" icon={FiMail} />
          <Input type="password" name="password" id="password" placeholder="Senha" icon={FiLock} />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="lll">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </S.Content>
    </S.Container>
  );
};

export default Signup;
