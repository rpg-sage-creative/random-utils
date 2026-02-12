import { randomInt } from "node:crypto";

type Unique = boolean | "byIndex" | "byValue";

type Options = {
	/** true | "index" means unique indexes; "value" means unqiue values */
	unique?: Unique;
};

/**
 * Returns an array of random values from the array.
 * @param array array of values to select from
 * @param count number of random values to choose
 */
export function randomItems<T>(array: T[], count: number): T[];

/**
 * @deprecated
 * Returns an array of random values from the array.
 * @param array array of values to select from
 * @param count number of random values to choose
 * @param unique if true, the same value (using .includes) will not be selected twice
 */
export function randomItems<T>(array: T[], count: number, unique?: boolean): T[];

/**
 * Returns an array of random values from the array.
 * @param array array of values to select from
 * @param count number of random values to choose
 * @param unique if true, the same value (using .includes) will not be selected twice
 */
export function randomItems<T>(array: T[], count: number, options?: Options): T[];

export function randomItems<T>(array: T[], count: number, options?: boolean | Options): T[] {
	// early exit for bad arguments
	if (array.length === 0) {
		return [];
		// throw RangeError("randomItems(array, count) array must have values");
	}
	if (count < 1) {
		return [];
		// throw RangeError("randomItems(array, count) count must be greater than 0");
	}

	// parse options
	const { unique } = typeof(options) === "boolean" ? { unique:options } : options ?? {};

	if (unique) {
		// if we are getting unique items by value, we need to filter down to unique values
		if (unique === "byValue") {
			array = array.filter((o, i, a) => a.indexOf(o) === i);
		}

		// now that the array is correct, we can get unique values by index
		return uniqueByIndex(array.length, count).map(index => array[index]) as T[];
	}

	// return non unique results
	return notUnique(array.length, count).map(index => array[index]) as T[];
}

function notUnique(arrayLength: number, count: number): number[] {
	// create return array
	const out: number[] =  [];

	// iterate until we have our count
	do {

		// randomly generate index
		out.push(randomInt(arrayLength));

	} while (out.length < count);

	// return indexes
	return out;
}

function uniqueByIndex(arrayLength: number, count: number): number[] {
	// create starting index array (this lets us splice to shrink the list while making randomization simple)
	const indexes = new Array(arrayLength).fill(0).map((_, i) => i);

	// figure total to return
	const total = Math.min(arrayLength, count);

	// create return array
	const out: number[] =  [];

	// iterate until we have our total
	do {
		// randomly generate index
		const randomIndex = randomInt(indexes.length);

		// get an unused index from that random index
		out.push(indexes[randomIndex]!);

		// remove the index just used
		indexes.splice(randomIndex, 1);

	} while (out.length < total);

	return out;
}
