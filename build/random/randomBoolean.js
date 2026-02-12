import { randomInt } from "node:crypto";
export function randomBoolean() {
    return randomInt(2) === 1;
}
