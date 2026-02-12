import { rollDie } from "./rollDie.js";
export function rollDice(count, sides) {
    const rolls = [];
    if (count > 0) {
        for (let i = count; i--;) {
            rolls.push(rollDie(sides));
        }
    }
    return rolls;
}
