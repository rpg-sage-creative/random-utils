import { randomInt } from "node:crypto";
import { MaxItemsCount } from "./const.js";
import { safeIntegerTypeError } from "../internal/safeIntegerTypeError.js";
export function randomItems(array, count, options) {
    if (typeof (count) !== "number") {
        throw safeIntegerTypeError("count", 1, MaxItemsCount, count);
    }
    if (!array?.length) {
        return [];
    }
    if (count < 1 || count > MaxItemsCount) {
        return [];
    }
    const { unique } = typeof (options) === "boolean" ? { unique: options } : options ?? {};
    if (unique) {
        if (unique === "byValue") {
            array = array.filter((o, i, a) => a.indexOf(o) === i);
        }
        return uniqueByIndex(array.length, count).map(index => array[index]);
    }
    return notUnique(array.length, count).map(index => array[index]);
}
function notUnique(arrayLength, count) {
    const out = new Array(count);
    for (let i = 0; i < count; i++) {
        out[i] = randomInt(arrayLength);
    }
    return out;
}
function uniqueByIndex(arrayLength, count) {
    const indexes = new Array(arrayLength).fill(undefined).map((_, i) => i);
    const total = Math.min(arrayLength, count);
    const out = new Array(total);
    for (let i = 0; i < total; i++) {
        const randomIndex = randomInt(indexes.length);
        out[i] = indexes[randomIndex];
        indexes.splice(randomIndex, 1);
    }
    return out;
}
