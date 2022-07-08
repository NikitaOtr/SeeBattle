import React from 'react';
import s from './App.module.css';

import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { GameInformation } from './components/GameInformation/GameInformation';

import { ICountShips, TField, TTurnMove } from './types/commonTypes';
import { createRandomField } from './utils/createRadomField';
import { turnBot } from './utils/turnBot';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(true);

    const [userName, setUserName] = React.useState('');

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [wasPlaying, setWasPlaying] = React.useState(false);
    const [countShips, setCountShips] = React.useState<ICountShips>({player: 20, bot: 20});

    const [turnMove, setTurnMove] = React.useState<TTurnMove>('player')

    const [userField, setUserField] = React.useState<TField>(createRandomField);
    const [botField, setBotField] = React.useState<TField>(createRandomField);

    React.useEffect(() => {
        if (countShips.bot === 0 || countShips.player === 0) {
            setIsPlaying(false);
        }
    }, [countShips]);

    React.useEffect(() => {
        if (turnMove === 'bot') {
            const nextField = userField.map(row => row.map(cell => ({ ...cell })));
            const test = turnBot(nextField);
            setTimeout(() => {
                setCountShips(prev => {
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
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setCountShips={setCountShips}
                    setWasPlaying={setWasPlaying}/> 
                <div className={s.info}>
                    <GameInformation isPlaying={isPlaying} turnMove={turnMove} userName={userName} 
                        countShips={countShips}/>
                    <ButtonsBlock setIsWelcomingPopup={setIsWelcomingPopup} setUserField={setUserField}
                        setBotField={setBotField} setIsPlaying={setIsPlaying} isPlaying={isPlaying}
                        wasPlaying={wasPlaying} setWasPlaying={setWasPlaying} setCountShips={setCountShips} 
                        countShips={countShips} userName={userName}/>
                </div>
                <Field field={botField} setField={setBotField} player='Бот' isBot={true}
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setCountShips={setCountShips}
                    setWasPlaying={setWasPlaying}/>
            </section>
        </div>
    );
};