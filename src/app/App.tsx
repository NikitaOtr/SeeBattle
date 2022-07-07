import React from 'react';
import s from './App.module.css';

import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(true);
    const [userName, setUserName] = React.useState('');


    return (
        <div className={s.app}>
            <h1 className={s.title}>Морской бой</h1>
            {isWelcomingPopup && 
                <WelcomingPopup setUserName={setUserName} setIsWelcomingPopup={setIsWelcomingPopup}/>
            }
            <section className={s.appContent}>
                <Field/>
                <ButtonsBlock/>
                <Field/>
            </section>
        </div>
    );
};