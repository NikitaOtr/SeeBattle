import React from 'react'
import { IFinish, TTurnMove } from './../../types/FieldTypes';
import s from './GameInformation.module.css';

interface IProps {
    isPlaying: boolean
    turnMove: TTurnMove
    userName: string
    finish: IFinish
}

export const GameInformation: React.FC<IProps> = ({ isPlaying, turnMove, userName, finish }) => {
    const generationInformation = () => {
        if (!userName) {
            return 'Если вы хотите сыграть не обходимо ввести имя. Нажмите "Изменить имя"';
        }
        if (finish.bot === 0) {
            return 'Вы победили!!! Если хотите сыграть ещё раз нажмите "Начать новую играть"';
        }
        if (finish.player === 0) {
            return 'Победил Бот.Вы можете взять реванш для этого нажмите "Начать новую играть"';
        }
        if (isPlaying) {
            return `Сейчас ходит ${turnMove === 'bot' ? 'Бот' : userName}`;
        } else {
            return 'Для начала игры нажмите "Начать новую играть"';
        }
    };

    return (
        <div className={s.information}>{generationInformation()}</div>
    );
};