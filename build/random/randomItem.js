import { randomInt } from "node:crypto";
export function randomItem(array) {
    return array.length === 0
        ? undefined
        : array[randomInt(array.length)];
}
