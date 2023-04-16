export function splitEvenOdd<T>(arr: T[]): T[][] {
    const even = arr.filter((_, i) => i % 2 === 0);
    const odd = arr.filter((_, i) => i % 2 !== 0);
    return [even, odd];
}
