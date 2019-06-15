const { test } = require('zora');
const Grapher = require('../components/grapher');

test("Test grapher.js", t => {
	let testArr = [ 1000, 90, 20, 890, 0 ];
	t.deepEqual(
		new Grapher(0, 100, testArr)
			.getPositions([20, 890]),
		[2, 89],
		"Tests for the getPositions basics"
	);
	t.deepEqual(
		new Grapher(1, 101, testArr)
			.getPositions([1000, 90]),
		[ 101, 10 ],
		"Add a min number"
	);
	t.deepEqual(
		new Grapher(300, 400, testArr)
			.getPositions([300, 900]),
		[330, 390],
		"Test on a broader scale"
	)
	t.deepEqual(
		new Grapher(50, 150, [1, 3, 11, 4, 8])
			.getPositions([1, 3, 11, 4, 8]),
		[50, 70, 150, 80, 120],
		"Prove some strange behavior"
	)
	t.deepEqual(
		new Grapher(300, 400, testArr)
			.flipPositions([330, 390]),
		[370, 310],
		"Test flipPositions()"
	)
})