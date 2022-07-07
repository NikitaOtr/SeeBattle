import React from 'react';
import s from './FieldItem.module.css';

interface IProps {
    value: string
}

export const FieldItem: React.FC<IProps> = ({ value }) => {
    console.log(value);
    return (
        <div className={s.fieldItem + ' ' + (value === '#' ? s.board : '')}></div>
    );
};