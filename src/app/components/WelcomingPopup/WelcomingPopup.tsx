import React, { SetStateAction } from 'react';
import s from './WelcomingPopup.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { isValidUserName } from './../../utils/isValidUserName';

import {ReactComponent as Cross} from './../../imgs/cross.svg';

interface IProps {
    setUserName: React.Dispatch<SetStateAction<string>>
    setIsWelcomingPopup: React.Dispatch<SetStateAction<boolean>>
}

export const WelcomingPopup: React.FC<IProps> = ({ setUserName, setIsWelcomingPopup }) => {
    const [valueInput, setValueInput] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidUserName(valueInput)) {
            setUserName(valueInput);
            setIsWelcomingPopup(false);
        } else {
            setIsError(true);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValueInput(value);
        isValidUserName(value) && setIsError(false);
    };

    const onBlur = () => {
        isValidUserName(valueInput) ? setIsError(false) : setIsError(true);
    };

    return (
        <div className={s.wrapper} onClick={() => setIsWelcomingPopup(false)}>
            <div className={s.popup} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className={s.boxCross}>
                    <Cross className={s.boxCross__cross} onClick={() => setIsWelcomingPopup(false)}/>
                </div>

                <h2>Вас приветствует игра:</h2>
                <h2 className={s.title}>"Морской бой"</h2>
                
                <form className={s.form} onSubmit={onSubmit} >
                    <label>
                        <p className={s.labelText}>Для продолжения необходимо ввести имя</p>  
                        <input className={`${s.input} ${isError ? s.inputError : ''}`} 
                            value={valueInput} onChange={onChange} onBlur={onBlur}/>
                        <div className={isError ? s.active : s.inActive}>
                            <p className={s.error}>Имя должно начинаться большой буквы</p>
                            <p className={s.error}>и иметь не менее 3 символов</p>
                        </div>
                    </label>
                    <ButtonApp>Продолжить</ButtonApp>
                </form>
            </div>
        </div>
    );
};