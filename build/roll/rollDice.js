import { safeIntegerTypeError } from "../internal/safeIntegerTypeError.js";
import { MaxDiceCount, MaxDieSides } from "./const.js";
import { randomInt } from "node:crypto";
export function rollDice(count, sides) {
    if (typeof (count) !== "number") {
        throw safeIntegerTypeError("count", 1, MaxDiceCount, count);
    }
    if (typeof (sides) !== "number") {
        throw safeIntegerTypeError("sides", 1, MaxDieSides, sides);
    }
    if (count < 1 || count > MaxDiceCount) {
        return [];
    }
    if (!sides || sides < 1 || sides > MaxDieSides) {
        return [];
    }
    if (sides === 1) {
        return [count];
    }
    const rolls = new Array(count);
    for (let i = 0; i < count; i++) {
        rolls[i] = randomInt(sides) + 1;
    }
    return rolls;
}
