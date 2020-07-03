import React from 'react';

import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

import * as S from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <S.Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </S.Container>
  );
};

export default ToastContainer;
