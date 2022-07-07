import React, { FC, MouseEvent } from 'react';
import s from './ButtonApp.module.css';

interface IProps {
    children?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}

export const ButtonApp: FC<IProps> = ({ children, onClick, disabled }) => {
    return (
        <button disabled={disabled} className={s.button} onClick={e => onClick && onClick(e)}>
            {children}
        </button>
    );
};