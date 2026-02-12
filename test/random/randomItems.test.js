import { tagLiterals } from "@rsc-utils/template-literal-utils";
import { randomItems } from "../../build/index.js";

describe("random", () => {
	describe("randomItems", () => {

		const array = [1,2,"a","b",{},new Date(),new Map(),"a"];
		describe(tagLiterals`randomItems(array = ${array}, count, options)`, () => {

			for (let count = -1; count < array.length + 5; count++) {
				const expectedCount = Math.max(count, 0);

				test(tagLiterals`randomItems(array, ${count}).length === ${expectedCount}`, () => {
					for (let i = 0; i < 1000; i++) {
						// randomize
						const items = randomItems(array, count);
						// check length
						expect(items.length).toBe(expectedCount);
						// make sure the items are all from the array
						expect(items.every(item => array.includes(item))).toBe(true);
					}
				});

				// byIndex
				test(tagLiterals`randomItems(array, ${count}, ${{ unique:"byIndex" }})`, () => {
					for (let i = 0; i < 1000; i++) {
						// randomize
						const items = randomItems(array, count, { unique:"byIndex" });
						// check length
						expect(items.length).toBe(Math.min(array.length, expectedCount));
						// make sure the items are all from the array
						expect(items.every(item => array.includes(item))).toBe(true);
					}
				});

				test(tagLiterals`randomItems(array, ${count}, ${{ unique:"byValue" }})`, () => {
					for (let i = 0; i < 1000; i++) {
						// get unique values
						const uniqueArray = array.filter((o,i,a) => i===a.indexOf(o));
						// randomize from original
						const items = randomItems(array, count, { unique:"byValue" });
						// the last item is a duplicate and thus we can't select it; making the final count test return one fewer item
						expect(items.length).toBe(Math.min(expectedCount, uniqueArray.length));
						// make sure the items are all from the array
						expect(items.every(item => array.includes(item))).toBe(true);

						// ensure the resulting items have no duplicates
						const unique = items.filter((o,i,a) => i===a.indexOf(o));
						expect(unique.length).toBe(items.length);
						expect(unique).toEqual(items);
					}
				});
			}

		});

	});
});
