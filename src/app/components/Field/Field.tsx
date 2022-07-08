import React from 'react';
import s from './Field.module.css';

import { letters, numbers } from './../../assets/commonData';

import { FieldCell } from './../FieldCell/FieldCell';
import { MarkerField } from './../FieldMarker/FieldMarker';
import { IFinish, TField, TTurnMove } from './../../types/FieldTypes';
import { workBeforeKillShip } from './../../utils/workBeforeKillShip';

interface IProps {
    field: TField
    player: string
    isBot: boolean
    setField: React.Dispatch<React.SetStateAction<TField>>
    setTurnMove: React.Dispatch<React.SetStateAction<'player' | 'bot'>>
    setFinish: React.Dispatch<React.SetStateAction<IFinish>>
    setWasPlay: React.Dispatch<React.SetStateAction<boolean>>
    turnMove: TTurnMove
    isPlaying: boolean
}

export const Field: React.FC<IProps> = ({ field, player, isBot, setField, setTurnMove, turnMove, 
    isPlaying, setFinish, setWasPlay }) => {
    const shot = (field: TField, y: number, x: number) => {
        if (!isPlaying || field[y][x].wasShot || turnMove === 'bot') {
            return;
        }

        const nextField = field.map(row => row.map(cell => ({ ...cell })));

        nextField[y][x].wasShot = true;
        
        if (nextField[y][x].value === '#') {
            workBeforeKillShip(nextField, y, x);
            setFinish(prev => {
                return {
                    player: prev.player,
                    bot: prev.bot - 1,
                }
            })
            
        } else {
            setTurnMove('bot');
        }
        setWasPlay(true);
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