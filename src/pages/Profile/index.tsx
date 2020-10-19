import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationsErros';
import * as S from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } = data;

        const formData = {
          name,
          email,
          ...(old_password && {
            old_password,
            password,
            password_confirmation,
          }),
        };

        const response = await api.put('/profile', formData);

        addToast({
          type: 'success',
          title: 'Perfil Atualizado',
          description: 'Suas informações do perfil foram atualizadas com sucesso!',
        });

        updateUser(response.data);

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Error na atualização',
            description: 'Ocorreu um erro ao atualizar seu cadastro, tente novamente',
          });
        }
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        api.patch(`/users/avatar`, formData).then(response => {
          updateUser(response.data);
          addToast({ type: 'success', title: 'Atualizar avatar', description: 'Avatar atualizado com sucesso' });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <S.Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <S.Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <S.AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" name="avatar" id="avatar" onChange={handleAvatarChange} />
            </label>
          </S.AvatarInput>

          <h1>Meu Perfil</h1>

          <Input type="text" name="name" id="name" placeholder="Nome" icon={FiUser} />

          <Input type="text" name="email" id="email" placeholder="E-mail" icon={FiMail} />
          <Input
            type="password"
            name="old_password"
            id="old_password"
            placeholder="Senha atual"
            icon={FiLock}
            containerStyle={{ marginTop: 24 }}
          />
          <Input type="password" name="password" id="password" placeholder="Nova senha" icon={FiLock} />
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Confirmar senha"
            icon={FiLock}
          />

          <Button type="submit">Confirmar mudança</Button>
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default Profile;
