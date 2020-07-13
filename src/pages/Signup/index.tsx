import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationsErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';
import * as S from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error no cadastro',
            description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input type="text" name="name" id="name" placeholder="Nome" icon={FiUser} />

          <Input type="text" name="email" id="email" placeholder="E-mail" icon={FiMail} />
          <Input type="password" name="password" id="password" placeholder="Senha" icon={FiLock} />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o login
        </Link>
      </S.Content>
    </S.Container>
  );
};

export default Signup;
