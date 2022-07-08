import React from 'react';
import s from './Field.module.css';

import { letters, numbers } from './../../assets/commonData';

import { FieldCell } from '../FieldCell/FieldCell';
import { MarkerField } from './../FieldMarker/FieldMarker';
import { TField } from './../../types/FieldTypes';
import { workBeforeKillShip } from './../../utils/workBeforeKillShip';

interface IProps {
    field: TField
    player: string
    isBot: boolean
    setField: React.Dispatch<React.SetStateAction<TField>>
    setTurnMove: React.Dispatch<React.SetStateAction<'player' | 'bot'>>
}

export const Field: React.FC<IProps> = ({ field, player, isBot, setField, setTurnMove }) => {
    const shot = (field: TField, y: number, x: number) => {
        const nextField = field.map(row => row.map(cell => ({ ...cell })));
        if (nextField[y][x].wasShot) {
            return;
        }

        nextField[y][x].wasShot = true;
        
        if (nextField[y][x].value === '#') {
            workBeforeKillShip(nextField, y, x);
        } else {
            setTurnMove('bot');
        }
        setField(nextField);
    };

    return (
        <div>
            <h2 className={s.title}>Поле игрока: {player}</h2>
            <div className={s.field}>
                <div className={s.letters}>
                    {letters.map(letter => (
                        <MarkerField key={letter} value={letter}/>
                    ))}
                </div>

                <div className={s.numbers}>
                    {numbers.map(number => (
                        <MarkerField key={number} value={number}/>
                    ))}
                </div>

                <div className={s.map}>
                    {field.map((row, rowIndex) => {
                        return row.map((item, columnIndex) => (
                            <FieldCell key={rowIndex + columnIndex} isBot={isBot} 
                                shot={() => shot(field, rowIndex, columnIndex)} item={item}/>
                        ))
                    })}
                </div>
            </div>
        </div>
    );
};