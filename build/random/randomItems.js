import { randomInt } from "node:crypto";
export function randomItems(array, count, options) {
    if (array.length === 0) {
        return [];
    }
    if (count < 1) {
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
    const out = [];
    do {
        out.push(randomInt(arrayLength));
    } while (out.length < count);
    return out;
}
function uniqueByIndex(arrayLength, count) {
    const indexes = new Array(arrayLength).fill(0).map((_, i) => i);
    const total = Math.min(arrayLength, count);
    const out = [];
    do {
        const randomIndex = randomInt(indexes.length);
        out.push(indexes[randomIndex]);
        indexes.splice(randomIndex, 1);
    } while (out.length < total);
    return out;
}
