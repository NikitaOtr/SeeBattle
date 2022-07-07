import { getRandomNumber } from './getRandomNumber';
import { getRandomFrom } from './getRandomFrom';

const isCanPlace = (field: Array<Array<string>>, y: number, x: number) => {
    let canPlace = true;
    for(let localY = y - 1; localY <= y + 1; localY++) {
        for(let localX = x - 1; localX <= x + 1; localX++) {
            canPlace = canPlace && field[localY][localX] === '.'
        }
    }
    return canPlace;
}

export const createRandomField = () => {
    const field = Array(12).fill('').map(item => Array(12).fill('.'));
   
    for (let size = 4; size >= 1; size--) {
        for (let count = 1; count <= (5 - size); count++) {
            const direction = getRandomFrom('row', 'column');

            if (direction === 'row') {
                let x = 0;
                let y = 0;
                let canPlace = false;
                while(!canPlace) {
                    y = getRandomNumber(1, 10);
                    x = getRandomNumber(1, (10 - size + 1));
                    canPlace = true;
                    for (let z = x; z < x + size; z++) {
                        canPlace = canPlace && isCanPlace(field, y, z);
                    }
                }
                for (let z = x; z < x + size; z++) {
                    field[y][z] = '#';
                }
            } else if (direction === 'column') {
                let x = 0;
                let y = 0;
                let canPlace = false;
                while (!canPlace) {
                    y = getRandomNumber(1, (10 - size + 1));
                    x = getRandomNumber(1, 10);
                    canPlace = true;
                    for (let z = y; z < y + size; z++) {
                        canPlace = canPlace && isCanPlace(field, z, x);
                    }
                }
                for (let z = y; z < y + size; z++) {
                    field[z][x] = '#';
                }
            }
        }
    }

    field.pop();
    field.shift();
    field.forEach(arr => {
        arr.pop();
        arr.shift();
    });

    return field;
};