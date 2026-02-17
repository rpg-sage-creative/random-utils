import { randomInt } from "node:crypto";
import { MaxDieSides } from "./const.js";
import { safeIntegerTypeError } from "../internal/safeIntegerTypeError.js";
export function rollDie(sides) {
    if (typeof (sides) !== "number") {
        throw safeIntegerTypeError("sides", 1, MaxDieSides, sides);
    }
    if (sides === 1) {
        return 1;
    }
    if (sides < 1 || sides > MaxDieSides) {
        return 0;
    }
    return randomInt(sides) + 1;
}
