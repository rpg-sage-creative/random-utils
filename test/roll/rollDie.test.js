import { tagLiterals } from "@rsc-utils/template-literal-utils";
import { rollDie } from "../../build/index.js";

describe("random", () => {
	describe("rollDie", () => {

		const tests = [
			// null counts as 0; but as it is typed we shouldn't have to worry about it
			{ sides:null, values:[0], throws:false },

			{ sides:undefined, values:[], throws:true },
			{ sides:"null", values:[], throws:true },

			{ sides:-1, values:[0], throws:false },
			{ sides:0, values:[0], throws:false },
			{ sides:1, values:[1], throws:false },
			{ sides:2, values:[1,2], throws:false },
			{ sides:3, values:[1,2,3], throws:false },
			{ sides:4, values:[1,2,3,4], throws:false },
			{ sides:6, values:[1,2,3,4,5,6], throws:false },
			{ sides:8, values:[1,2,3,4,5,6,7,8], throws:false },
			{ sides:10, values:[1,2,3,4,5,6,7,8,9,10], throws:false },
			{ sides:12, values:[1,2,3,4,5,6,7,8,9,10,11,12], throws:false },
			{ sides:20, values:new Array(20).fill(0).map((_,i)=>i+1), throws:false },
			{ sides:30, values:new Array(30).fill(0).map((_,i)=>i+1), throws:false },
			{ sides:100, values:new Array(100).fill(0).map((_,i)=>i+1), throws:false },
		];

		tests.forEach(({ sides, values, throws }) => {
			if (!throws) {
				test(tagLiterals`rollDie(${sides}) to be in ${[values[0],"...",values[values.length-1]]}`, () => {
					for (let i = 0; i < 1000; i++) {
						expect(values.includes(rollDie(sides))).toBe(true);
					}
				});

			}else {
				test(tagLiterals`rollDie(${sides}) to throw`, () => {
					expect(() => rollDie(sides)).toThrow();
				});
			}
		});

	});
});
