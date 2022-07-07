export const random = {
    getRandomNumber(min: number, max: number) {
        return min + Math.floor((Math.random() * (max - min + 1)));
    },

    getRandomFrom(...args: Array<unknown>) {
        return args[Math.floor(Math.random() * (args.length))];
    },
};