/**
 * Ensures min/max are correct before creating the random int.
 * If min and max are the same, that value is returned instead of trying to randomize.
 * Convencience for `crypto.randomInt(Math.min(min, max), Math.max(min, max) + 1)`
 */
export declare function randomInt(min: number, max: number): number;
