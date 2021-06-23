import React, { ReactElement, ReactNode } from 'react';

import s from './Button.module.css';

export interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props): ReactElement => {
  return (
    <div className={s.root}>
      {children}
    </div>
  )
}

export default Button
