import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <S.Container type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </S.Container>
  );
};
export default Button;
