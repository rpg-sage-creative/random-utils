import { tagLiterals } from "@rsc-utils/template-literal-utils";
import { randomItems } from "../../build/index.js";

describe("random", () => {
	describe("randomItems", () => {

		const array = [1,2,"a","b",{},new Date(),new Map(),"a"];

		for (let count = 0; count < array.length + 1; count++) {
			test(tagLiterals`randomItems(${array}, ${count})`, () => {
				for (let i = 0; i < 1000; i++) {
					const items = randomItems(array, count);
					expect(items.length).toBe(count);
					items.forEach(item => expect(array.includes(item)).toBe(true));
				}
			});

			test(tagLiterals`randomItems(${array}, ${count}, ${true})`, () => {
				for (let i = 0; i < 1000; i++) {
					const items = randomItems(array, count, true);
					expect(items.length).toBe(count);
					items.forEach(item => expect(array.includes(item)).toBe(true));

					// if (count < array.length - 1) {
					// 	const unique = [...new Set(items)];
					// 	expect(items.length).toEqual(unique.length);
					// 	expect(items).toEqual(unique);
					// }
				}
			});

			test(tagLiterals`randomItems(${array}, ${count}, ${{ unique:"byValue" }})`, () => {
				for (let i = 0; i < 1000; i++) {
					const uniqueArray = array.filter((o,i,a) => i===a.indexOf(o));

					const items = randomItems(array, count, { unique:"byValue" });
					// the last item is a duplicate and thus we can't select it; making the final count test return one fewer item
					expect(items.length).toBe(Math.min(count, uniqueArray.length));
					items.forEach(item => expect(array.includes(item)).toBe(true));

					// ensure the resulting items have no duplicates
					const unique = items.filter((o,i,a) => i===a.indexOf(o));
					expect(unique.length).toBe(items.length);
					expect(unique).toEqual(items);
				}
			});
		}

	});
});
