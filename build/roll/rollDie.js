import { randomInt } from "node:crypto";
export function rollDie(sides) {
    if (sides < 1) {
        return 0;
    }
    if (sides === 1) {
        return 1;
    }
    return randomInt(sides) + 1;
}
