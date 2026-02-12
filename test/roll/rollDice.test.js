import { tagLiterals } from "@rsc-utils/template-literal-utils";
import { rollDice } from "../../build/index.js";

describe("random", () => {
	describe("rollDice", () => {

		const buildTest = (count, { sides, values, throws }) => {
			if (throws && count > 0) return { count, sides, values:values??[], throws };
			return {
				count,
				sides,
				values: values??(count>0&&sides>0?new Array(sides).fill(0).map((_,i)=>i+1):[])
			};
		};

		const tests = [
			// null counts as 0; but as it is typed we shouldn't have to worry about it
			{ sides:null, values:[0], throws:false },

			{ sides:undefined, values:[0], throws:true },
			{ sides:"null", values:[0], throws:true },

			{ sides:-1, values:[0], throws:false },
			{ sides:0, values:[0], throws:false },
			{ sides:1, throws:false },
			{ sides:2,throws:false },
			{ sides:3, throws:false },
			{ sides:4,  throws:false },
			{ sides:6,  throws:false },
			{ sides:8,  throws:false },
			{ sides:10, throws:false },
			{ sides:12,  throws:false },
			{ sides:20, throws:false },
			{ sides:30, throws:false },
			{ sides:100,  throws:false },
		]
		.map((test) => [-1,0,1,2,3].map(count => buildTest(count, test)))
		.flat();

		tests.forEach(({ count, sides, values, throws }) => {
			if (!throws) {
				test(tagLiterals`rollDice(${count}, ${sides}) to be in ${values.length?[values[0],"...",values[values.length-1]]:[]}`, () => {
					for (let i = 0; i < 1000; i++) {
						const rolls = rollDice(count, sides);
						rolls.every(roll => expect(values.includes(roll)).toBe(true));
					}
				});

			}else {
				test(tagLiterals`rollDice(${count}, ${sides}) to throw`, () => {
					expect(() => rollDice(count, sides)).toThrow();
				});
			}
		});

	});
});
