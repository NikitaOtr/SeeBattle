import { TField } from '../types/commonTypes';
import { random } from './random';
import { workBeforeKillShip } from './workBeforeKillShip';

export const turnBot = (field: TField) => {
    let y;
    let x;
    let turnMove = 'bot';
    do {
        y = random.getRandomNumber(0, 9);
        x = random.getRandomNumber(0, 9);
    } while (field[y][x].wasShot)

    field[y][x].wasShot = true;
    if (field[y][x].value === '#') {
        workBeforeKillShip(field, y, x);
    } else {
        turnMove = 'player';
    }
    return {field, turnMove};
}

