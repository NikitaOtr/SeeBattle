import React from 'react';
import s from './App.module.css';

import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { TField } from './types/FieldTypes';
import { createRandomField } from './utils/createRadomField';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(false);
    const [userName, setUserName] = React.useState('');

    const [userField, setUserField] = React.useState<TField>(() => createRandomField());
    const [botField, setBotField] = React.useState<TField>(() => createRandomField());

    return (
        <div className={s.app}>
            <h1 className={s.title}>Морской бой</h1>
            {isWelcomingPopup && 
                <WelcomingPopup setUserName={setUserName} userName={userName} 
                    setIsWelcomingPopup={setIsWelcomingPopup}/>
            }
            <section className={s.appContent}>
                <Field field={userField} setField={setUserField} player={userName} isBot={false}/>
                <ButtonsBlock setIsWelcomingPopup={setIsWelcomingPopup} setUserField={setUserField}/>
                <Field field={botField} setField={setBotField} player='Бот' isBot={true}/>
            </section>
        </div>
    );
};