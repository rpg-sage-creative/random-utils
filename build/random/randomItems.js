import { randomInt } from "node:crypto";
import { MaxItemsCount } from "./const.js";
import { safeIntegerTypeError } from "../internal/safeIntegerTypeError.js";
export function randomItems(array, count, options) {
    if (typeof (count) !== "number") {
        throw safeIntegerTypeError("count", 1, MaxItemsCount, count);
    }
    // early exit for bad arguments
    if (!array?.length) {
        return [];
        // throw RangeError("randomItems(array, count) array must have values");
    }
    if (count < 1 || count > MaxItemsCount) {
        return [];
        // throw RangeError("randomItems(array, count) count must be greater than 0");
    }
    // parse options
    const { unique } = typeof (options) === "boolean" ? { unique: options } : options ?? {};
    if (unique) {
        // if we are getting unique items by value, we need to filter down to unique values
        if (unique === "byValue") {
            array = array.filter((o, i, a) => a.indexOf(o) === i);
        }
        // now that the array is correct, we can get unique values by index
        return uniqueByIndex(array.length, count).map(index => array[index]);
    }
    // return non unique results
    return notUnique(array.length, count).map(index => array[index]);
}
function notUnique(arrayLength, count) {
    // create return array
    const out = new Array(count);
    // fill with random indexes
    for (let i = 0; i < count; i++) {
        out[i] = randomInt(arrayLength);
    }
    // return indexes
    return out;
}
function uniqueByIndex(arrayLength, count) {
    // create starting index array (this lets us splice to shrink the list while making randomization simple)
    const indexes = new Array(arrayLength).fill(undefined).map((_, i) => i);
    // figure total to return
    const total = Math.min(arrayLength, count);
    // create return array
    const out = new Array(total);
    // iterate until we have our total
    for (let i = 0; i < total; i++) {
        // randomly generate index
        const randomIndex = randomInt(indexes.length);
        // get an unused index from that random index
        out[i] = indexes[randomIndex];
        // remove the index just used
        indexes.splice(randomIndex, 1);
    }
    return out;
}
