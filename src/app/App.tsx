import React, { useEffect } from 'react';
import s from './App.module.css';

import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { TField } from './types/FieldTypes';
import { createRandomField } from './utils/createRadomField';
import { random } from './utils/random';
import { workBeforeKillShip } from './utils/workBeforeKillShip';
import { turnBot } from './utils/turnBot';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(false);
    const [userName, setUserName] = React.useState('Default');

    const [turnMove, setTurnMove] = React.useState<'player' | 'bot'>('player')

    const [userField, setUserField] = React.useState<TField>(createRandomField);
    const [botField, setBotField] = React.useState<TField>(createRandomField);

    useEffect(() => {
        if (turnMove === 'bot') {
            const nextField = userField.map(row => row.map(cell => ({ ...cell })));
            const test = turnBot(nextField);
            setTimeout(() => {
                setUserField(test.field);
                setTurnMove(test.turnMove as 'bot');
            }, 2000)
        }
    }, [turnMove, userField])

    return (
        <div className={s.app}>
            <h1 className={s.title}>Морской бой</h1>
            {isWelcomingPopup && 
                <WelcomingPopup setUserName={setUserName} userName={userName} 
                    setIsWelcomingPopup={setIsWelcomingPopup}/>
            }
            <section className={s.appContent}>
                <Field field={userField} setField={setUserField} player={userName} 
                    isBot={false} setTurnMove={setTurnMove}/>
                <div>
                    <div>
                        {turnMove === 'player'
                            ? 'Сейчас ходит ' + userName
                            : 'Сейчас ходит Бот'
                        }
                    </div>
                    <ButtonsBlock setIsWelcomingPopup={setIsWelcomingPopup} setUserField={setUserField}/>
                </div>
                <Field field={botField} setField={setBotField} player='Бот' 
                    isBot={true} setTurnMove={setTurnMove}/>
            </section>
        </div>
    );
};