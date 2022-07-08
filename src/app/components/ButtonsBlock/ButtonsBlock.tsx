import React from 'react';
import s from './ButtonsBlock.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { createRandomField } from './../../utils/createRadomField';
import { IFinish, TField } from './../../types/FieldTypes';

interface IProps {
    setIsWelcomingPopup: React.Dispatch<React.SetStateAction<boolean>>
    userName: string

    setUserField: React.Dispatch<React.SetStateAction<TField>>
    setBotField: React.Dispatch<React.SetStateAction<TField>>

    finish: IFinish
    setFinish: React.Dispatch<React.SetStateAction<IFinish>>

    isPlaying: boolean
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>

    wasPlay: boolean,
    setWasPlay: React.Dispatch<React.SetStateAction<boolean>>

}

export const ButtonsBlock: React.FC<IProps> = ({ setIsWelcomingPopup, setUserField, setBotField, 
    setIsPlaying, isPlaying, wasPlay, setWasPlay, setFinish, finish, userName }) => {

    const createNewFields = () => {
        setUserField(createRandomField());
        setBotField(createRandomField());
    };

    const onClickNewGame = () => {
        wasPlay && createNewFields();
        setIsPlaying(true);
        setWasPlay(false);
        setFinish({ bot: 20, player: 20 });
    };

    const onClickChangeField = () => {
        createNewFields();
        setWasPlay(false);
    };

    return (
        <div className={s.buttonsBlock}>
            <ButtonApp disabled={!userName || isPlaying} onClick={onClickNewGame}>Начать новую игру</ButtonApp>
            <ButtonApp disabled={!isPlaying || finish.bot === 0 || finish.player === 0} 
                onClick={() => setIsPlaying(prev => !prev)}>
                {isPlaying ? 'Остановить игру' : 'Продолжить игру'}
            </ButtonApp>
            <ButtonApp disabled={isPlaying} onClick={onClickChangeField}>Изменить расстановку</ButtonApp>
            <ButtonApp disabled={isPlaying} onClick={() => setIsWelcomingPopup(true)}>Изменить имя</ButtonApp>
        </div>
    );
};