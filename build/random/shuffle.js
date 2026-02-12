import { randomInt } from "node:crypto";
export function shuffle(array) {
    const itemCount = array.length;
    if (itemCount < 2) {
        return array.slice();
    }
    const shuffled = array.map((_, index) => index);
    do {
        for (let currentIndex = 0; currentIndex < itemCount; currentIndex++) {
            const randomIndex = randomInt(itemCount);
            const value = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[randomIndex];
            shuffled[randomIndex] = value;
        }
    } while (!shuffled.some((value, index) => value !== index));
    return shuffled.map(index => array[index]);
}
