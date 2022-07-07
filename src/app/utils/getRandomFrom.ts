export const getRandomFrom = (...args: Array<unknown>) => {
    return args[Math.floor(Math.random() * (args.length))];
};