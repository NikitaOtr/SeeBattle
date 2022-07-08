import React, { useEffect } from 'react';
import s from './App.module.css';

import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { Field } from './components/Field/Field';
import { GameInformation } from './components/GameInformation/GameInformation';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { IFinish, TField } from './types/FieldTypes';
import { createRandomField } from './utils/createRadomField';
import { turnBot } from './utils/turnBot';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(true);

    const [userName, setUserName] = React.useState('');

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [wasPlay, setWasPlay] = React.useState(false);
    const [finish, setFinish] = React.useState<IFinish>({player: 20, bot: 20});

    const [turnMove, setTurnMove] = React.useState<'player' | 'bot'>('player')

    const [userField, setUserField] = React.useState<TField>(createRandomField);
    const [botField, setBotField] = React.useState<TField>(createRandomField);

    useEffect(() => {
        if (finish.bot === 0 || finish.player === 0) {
            setIsPlaying(false);
        }
    }, [finish]);

    useEffect(() => {
        if (turnMove === 'bot') {
            const nextField = userField.map(row => row.map(cell => ({ ...cell })));
            const test = turnBot(nextField);
            setTimeout(() => {
                setFinish(prev => {
                    return {
                        bot: prev.bot,
                        player: prev.player - (test.turnMove === 'bot' ? 1 : 0),
                    }
                });
                setUserField(test.field);
                setTurnMove(test.turnMove as 'bot');
            }, 500)
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
                <Field field={userField} setField={setUserField} player={userName} isBot={false}
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setFinish={setFinish}
                    setWasPlay={setWasPlay}/> 
                <div className={s.info}>
                    <GameInformation isPlaying={isPlaying} turnMove={turnMove} userName={userName} finish={finish}/>
                    <ButtonsBlock setIsWelcomingPopup={setIsWelcomingPopup} setUserField={setUserField}
                        setBotField={setBotField} setIsPlaying={setIsPlaying} isPlaying={isPlaying}
                        wasPlay={wasPlay} setWasPlay={setWasPlay} setFinish={setFinish} finish={finish}
                        userName={userName}/>
                </div>
                <Field field={botField} setField={setBotField} player='Бот' isBot={true}
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setFinish={setFinish}
                    setWasPlay={setWasPlay}/>
            </section>
        </div>
    );
};