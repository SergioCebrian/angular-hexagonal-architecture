export const taskIsCompleted = (isCompleted: boolean) => {
    return typeof isCompleted === 'boolean' && isCompleted === false;
}