import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';
import * as S from './styles';
import getValidationErrors from '../../utils/getValidationsErros';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password_confirmation: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const [, token] = location.search.split('=');

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        await api.post(`/password/reset-password`, {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Alteração de senha',
          description: 'Senha alterada com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error ao resetar senha',
            description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
          });
        }
      }
    },
    [addToast, history, token],
  );

  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>
          <Input type="password" name="password" id="password" placeholder="Nova senha" icon={FiLock} />
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Confirmação de senha"
            icon={FiLock}
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default ResetPassword;
