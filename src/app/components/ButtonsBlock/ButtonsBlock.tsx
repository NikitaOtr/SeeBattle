import React from 'react';
import s from './ButtonsBlock.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { createRandomField } from './../../utils/createRadomField';
import { TField } from './../../types/FieldTypes';

interface IProps {
    setIsWelcomingPopup: React.Dispatch<React.SetStateAction<boolean>>
    setUserField: React.Dispatch<React.SetStateAction<TField>>
}

export const ButtonsBlock: React.FC<IProps> = ({ setIsWelcomingPopup, setUserField }) => {
    return (
        <div className={s.buttonsBlock}>
            <ButtonApp onClick={() => setIsWelcomingPopup(true)}>Изменить имя</ButtonApp>
            <ButtonApp onClick={() => setUserField(createRandomField())}>Изменить расстановку</ButtonApp>
        </div>
    );
};