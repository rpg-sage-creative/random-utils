/**
 * If the diceString is an integer, that number is returned.
 * Otherwise, returns the results of rolling simple dice: 1d6 or 1d8+1 or 1d10-2.
 * Returns undefined if the input isn't a valid simple dice roll.
 */
export declare function rollDiceString(diceString: string): number | undefined;
