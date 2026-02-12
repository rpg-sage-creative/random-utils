/**
 * Creates a new array by randomly reordering the contents of the given array.
 * To ensure duplicate values don't alter the shuffle logic, arrays will be shuffled by index, not by value.
 * Arrays without at least two values will be returned unshuffled.
 * @todo implement args { count:number; style:"clean" (perfect deck shuffle; 8x shuffles resets deck) | "unclean" (like clean but randomly shift index by 1 or 2) | "randmize" (what we do below)}
*/
export declare function shuffle<T>(array: T[]): T[];
