export const isValidUserName = (name: string) => {
    return /[A-ZА-ЯЁ]/.test(name.slice(0, 1)) && name.length > 2;
}