import React from 'react';
import s from './Field.module.css';

import { letters, numbers } from './../../assets/commonData';

import { FieldItem } from './../FieldItem/FieldItem';
import { MarkerField } from './../FieldMarker/FieldMarker';

export const Field = () => {
    const arr = Array(100).fill('').map((_, index) => index);

    return (
        <div>
            <h2 className={s.fieldTitle}>Поле Бота</h2>
            <div className={s.test}>
                <div className={s.laber}>
                    {letters.map(letter => (
                        <MarkerField key={letter} value={letter}/>
                    ))}
                </div>

                <div className={s.number}>
                    {numbers.map(number => (
                        <MarkerField key={number} value={number}/>
                    ))}
                </div>

                <div className={s.field}>
                    {arr.map(item => (
                        <FieldItem key={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
};