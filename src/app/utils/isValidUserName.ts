export const isValidUserName = (userName: string) => {
    return /[A-ZА-ЯЁ]/.test(userName.slice(0, 1)) && userName.length > 2;
}