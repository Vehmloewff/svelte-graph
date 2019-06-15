class Grapher {
	constructor(min, max, nums) {
		nums = nums.filter(num => num != null);
		this.max = max;
		this.min = min;
		this.nums = nums;

		const largestNumber = Math.max(...nums);
		const smallestNumber = Math.min(...nums);
		const dreamedSpread = max - min;
		const realSpread = largestNumber - smallestNumber;
		const multiplier = dreamedSpread / realSpread;

		this.transform = num => {
			return num * multiplier + min;
		}
	}

	getPositions(positions) {
		return positions.map(pos => this.transform(pos));
	}

	flipPositions(positions) {
		return positions.map(pos => {
			return this.min + (this.max - pos)
		});
	}
}
module.exports = Grapher;