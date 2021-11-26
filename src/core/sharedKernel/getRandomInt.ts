export function getRandomInt(minInput: number, maxInput: number): number {
    const min = Math.ceil(minInput);
    const max = Math.floor(maxInput);
    return Math.floor(Math.random() * (max - min)) + min;
}
