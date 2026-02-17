/**
 * Returns the results of rolling a single die.
 * Convenience for `randomInt(sides) + 1` with some min bound checking.
 * If sides === 1 then 1 is returned.
 * If sides < 1 || sides > 1000 then 0 is returned.
 * Can throw TypeError.
 */
export declare function rollDie(sides: number): number;
