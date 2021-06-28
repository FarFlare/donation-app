import React, { ReactElement, ReactNode } from 'react';

import s from './Button.module.css';

export interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: Props): ReactElement => {
  return (
    <button className={s.root} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
