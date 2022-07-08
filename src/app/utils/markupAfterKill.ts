import { TField } from '../types/commonTypes';
import { isInArray } from './isInArray';

const getIsKillShip = (field: TField, y: number, x: number) => {
    const stack = [[y, x]];
    const res = [[y, x]];
    while (stack.length > 0) {
        const [y, x] = stack.pop() as Array<number>;
        for (let localY = y - 1; localY <= y + 1; localY++) {
            for (let localX = x - 1; localX <= x + 1; localX++) {
                if (field[localY] && field[localY][localX] && !(localX === x && localY === y)
                    && !isInArray(res, [localY, localX]) && field[localY][localX].value === '#') {
                    if (field[localY][localX].wasShot) {
                        stack.push([localY, localX]);
                        res.push([localY, localX]);
                    } else {
                        return false;
                    }
                }
            }
        }
    }
    return res;
}

export const markupAfterKill = (field: TField, y: number, x: number) => {
    const isKill = getIsKillShip(field, y, x);
    if (isKill) {
        isKill.forEach(([y, x]) => {
            for (let localY = y - 1; localY <= y + 1; localY++) {
                for (let localX = x - 1; localX <= x + 1; localX++) {
                    if (field[localY] && field[localY][localX]) {
                        field[localY][localX].wasShot = true
                    }
                }
            }
        });
    }
};