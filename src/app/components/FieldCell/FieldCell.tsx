import React from 'react';
import s from './FieldCell.module.css';

import { IValueField } from '../../types/FieldTypes';

interface IProps {
    item: IValueField
    isBot: boolean
    shot: () => void
}

export const FieldCell: React.FC<IProps> = ({ item, isBot, shot }) => {
    return (
        <div onClick={() => shot()} 
             className={`${s.fieldItem} ${isBot ? s.fieldItemBot : ''} 
                         ${!isBot && item.value === '#' ? s.ship : s.notShip}`}> 
            {item.wasShot && <div className={`${item.value === '#' ? s.closeModal : s.miss}`}></div>}               
        </div>
    );
};