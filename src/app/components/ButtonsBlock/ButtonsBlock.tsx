import React from 'react';
import s from './ButtonsBlock.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';


export const ButtonsBlock = () => {
    return (
        <div className={s.buttonsBlock}>
            <ButtonApp>test</ButtonApp>
            
        </div>
    );
};