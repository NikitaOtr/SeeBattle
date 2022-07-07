import React from 'react';
import s from './App.module.css';

import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { createRandomField } from './utils/createRadomField';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(false);
    const [userName, setUserName] = React.useState('');

    const [userField, setUserField] = React.useState(createRandomField());
    const [botField, setBotField] = React.useState(createRandomField());

    return (
        <div className={s.app}>
            <h1 className={s.title}>Морской бой</h1>
            {isWelcomingPopup && 
                <WelcomingPopup setUserName={setUserName} setIsWelcomingPopup={setIsWelcomingPopup}/>
            }
            <section className={s.appContent}>
                <Field field={userField}/>
                <ButtonsBlock/>
                <Field field={botField}/>
            </section>
        </div>
    );
};