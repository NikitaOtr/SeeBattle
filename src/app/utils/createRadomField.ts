import { random } from './random';
import { TField } from '../types/commonTypes';

const canInsertCell = (field: TField, y: number, x: number) => {
    let isCatInsert = true;
    for(let localY = y - 1; localY <= y + 1; localY++) {
        for(let localX = x - 1; localX <= x + 1; localX++) {
            if (field[localY] && field[localY][localX]) {
                isCatInsert = isCatInsert && field[localY][localX].value === '.';
            }
        }
    }
    return isCatInsert;
}

export const createRandomField = () => {
    const field: TField = Array(10).fill('')
        .map(() => Array(10).fill('')
            .map(() => ({ 
                wasShot: false,
                value: '.',
         })));
    
    for (let size = 4; size >= 1; size--) {
        for (let count = 1; count <= (5 - size); count++) {
            const direction = random.getRandomFrom('row', 'column');

            if (direction === 'row') {
                let x = 0;
                let y = 0;
                let isCanInsert = false;
                while (!isCanInsert) {
                    y = random.getRandomNumber(0, 9);
                    x = random.getRandomNumber(0, (9 - size + 1));
                    isCanInsert = true;

                    for (let localX = x; localX < x + size; localX++) {
                        isCanInsert = isCanInsert && canInsertCell(field, y, localX);
                    }
                }

                for (let localX = x; localX < x + size; localX++) {
                    field[y][localX].value = '#';
                }
            } else if (direction === 'column') {
                let x = 0;
                let y = 0;
                let isCanInsert = false;
                while (!isCanInsert) {
                    y = random.getRandomNumber(0, (9 - size + 1));
                    x = random.getRandomNumber(0, 9);
                    isCanInsert = true;

                    for (let localY = y; localY < y + size; localY++) {
                        isCanInsert = isCanInsert && canInsertCell(field, localY, x);
                    }
                }

                for (let localY = y; localY < y + size; localY++) {
                    field[localY][x].value = '#';
                }
            }
        }
    }

    return field;
};