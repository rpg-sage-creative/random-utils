/**
 * Returns the results of rolling a single die.
 * Convenience for `randomInt(sides) + 1` with some min bound checking.
 * If sides < 1 then 0 is returned.
 * If sides === 1 then 1 is returned.
 */
export declare function rollDie(sides: number): number;
