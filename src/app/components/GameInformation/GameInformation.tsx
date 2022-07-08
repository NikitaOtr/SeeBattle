import React from 'react'
import { ICountShips, TTurnMove } from './../../types/commonTypes';
import s from './GameInformation.module.css';

interface IProps {
    isPlaying: boolean
    turnMove: TTurnMove
    userName: string
    countShips: ICountShips
}

export const GameInformation: React.FC<IProps> = ({ isPlaying, turnMove, userName, countShips }) => {
    const createInformation = () => {
        if (!userName) {
            return 'Если вы хотите сыграть не обходимо ввести имя. Нажмите "Изменить имя"';
        } else if (countShips.bot === 0) {
            return 'Вы победили!!! Если хотите сыграть ещё раз нажмите "Начать новую играть"';
        } else if (countShips.player === 0) {
            return 'Победил Бот.Вы можете взять реванш для этого нажмите "Начать новую играть"';
        } else if (isPlaying) {
            return `Сейчас делает ход: ${turnMove === 'bot' ? 'Бот' : userName}`;
        } else {
            return 'Для начала игры нажмите "Начать новую играть"';
        }
    };

    return (
        <div className={s.information}>{createInformation()}</div>
    );
};