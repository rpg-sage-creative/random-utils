import { rollDice } from "./rollDice.js";
/*
const SimpleDiceRegExp = regex("i")`
    ^
    (?<dSign> [ \- \+ ] )?
    (?<dCount> \d+ )
    d
    (?<dSides> \d+ )
    (
        (?<mSign> [ \- \+ ] )
        (?<mValue> \d+ )
    )?
    $
` as TypedRegExp<SimpleDiceGroups>;
*/
const SimpleDiceRegExp = /^(?<dSign>[\-\+])?(?<dCount>\d+)d(?<dSides>\d+)(?:(?<mSign>[\-\+])(?<mValue>\d+))?$/iv;
/**
 * If the diceString is an integer, that number is returned.
 * Otherwise, returns the results of rolling simple dice: 1d6 or 1d8+1 or 1d10-2.
 * Returns undefined if the input isn't a valid simple dice roll.
 */
export function rollDiceString(diceString) {
    const cleanDiceString = diceString?.replaceAll(" ", "");
    const coerced = +cleanDiceString;
    if (!isNaN(coerced)) {
        return coerced;
    }
    const match = SimpleDiceRegExp.exec(cleanDiceString);
    if (!match) {
        return undefined;
    }
    const { dSign, dCount, dSides, mSign, mValue } = match.groups;
    const sum = rollDice(+dCount, +dSides).reduce((total, value) => total + value, 0);
    const val = sum * (dSign === "-" ? -1 : 1);
    const mod = +(mValue ?? 0) * (mSign === "-" ? -1 : 1);
    return val + mod;
}
