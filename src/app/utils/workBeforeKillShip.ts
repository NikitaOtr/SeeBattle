import { TField } from '../types/commonTypes';

const hasArray = (arr: Array<Array<number>>, item: Array<number>) => {
    return arr.some(([y, x]) => y === item[0] && x === item[1]);
};

export const isKillShip = (field: TField, y: number, x: number) => {
    const arr1 = [[y, x]];
    const res = [[y, x]];
    while (arr1.length > 0) {
        console.log('res', res);
        const [y, x] = arr1.pop() as Array<number>;
        for (let localY = y - 1; localY <= y + 1; localY++) {
            for (let localX = x - 1; localX <= x + 1; localX++) {
                if (field[localY] && field[localY][localX] && !(localX === x && localY === y)
                    && !hasArray(res, [localY, localX])) {
                    if (field[localY][localX].value === '#') {
                        if (field[localY][localX].wasShot) {
                            arr1.push([localY, localX]);
                            res.push([localY, localX]);
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return res;
}

export const workBeforeKillShip = (field: TField, y: number, x: number) => {
    const isKill = isKillShip(field, y, x);
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