<style>
	
</style>

<script>
	import { onMount } from 'svelte';
	import Grapher from './grapher.js';
	import flatten from 'array-flatten';

	export let width = 400;
	export let height = 300;
	export let points = [{ name: "Actual", data: [ 1, 3, 2, 4, 8 ], bubble: true, color: "#620006", width: 5 }];
	export let labels = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

	export let color1 = "#fff7fd";
	export let color2 = "#fff7fd11";
	export let floor = null;
	export let ceiling = null;

	let canvas;
	let ctx;

	let widthSlots;
	let widthSpacing;
	$: widthSlots = labels.length + 1;
	$: widthSpacing = width / widthSlots;

	let heightSpacing;
	let heightSlots;
	$: heightSlots = Math.floor(height / 50);
	$: heightSpacing = height / heightSlots;

	let grapher;
	let pointsTransformed;
	$: pointsTransformed = flatten(points.map(point => point.data));
	$: grapher = new Grapher(
		heightSpacing,
		height - heightSpacing,
		[floor, ceiling, ...pointsTransformed]
	);

	onMount(() => {
		ctx = canvas.getContext('2d');
		createCanvas();
	})

	function createCanvas() {
		ctx.strokeStyle = color1;
		ctx.beginPath();
		ctx.moveTo(widthSpacing, heightSpacing * (heightSlots - 1));
		ctx.lineTo(widthSpacing * (widthSlots - 1), heightSpacing * (heightSlots - 1));
		ctx.stroke();

		for (let lineIndex in points) {
			lineIndex = Number(lineIndex);
			let { data, bubble, color, width } = points[lineIndex];
			data = grapher.flipPositions(grapher.getPositions(data));

			for (let pointIndex in data) {
				pointIndex = Number(pointIndex);
				let widthIndex = pointIndex + 1;
				
				if (lineIndex == 0) {
					ctx.beginPath();
					ctx.lineWidth = 2;
					ctx.strokeStyle = color2;
					ctx.moveTo(widthSpacing * widthIndex, heightSpacing);
					ctx.lineTo(widthSpacing * widthIndex, heightSpacing * (heightSlots - 1));
					ctx.stroke();

					ctx.fillStyle = color1;
					ctx.font = "10px Helvetica Neue Light";
					ctx.textBaseline = "top";
					ctx.textAlign = "center";
					ctx.fillText(labels[pointIndex], widthSpacing * widthIndex, heightSpacing * (heightSlots - 1) + 10);
				}

				if (bubble) {
					ctx.beginPath();
					const x = widthSpacing * widthIndex;
					const y = data[pointIndex];
					const radius = 10;
					const startAngle = 0;
					const endAngle = (Math.PI / 180) * 360;
					ctx.arc(x, y, radius, startAngle, endAngle, false);
					ctx.fillStyle = color;
					ctx.fill();
				}

				ctx.beginPath();
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.moveTo(widthSpacing * pointIndex, data[pointIndex - 1]);
				ctx.lineTo(widthSpacing * widthIndex, data[pointIndex]);
				ctx.stroke();
			}
		}

		let indicators = [ 10, 20, 30, 40, 50, 60, 70 ];
		for (let plane = 0; plane < indicators.length; plane++) {
			ctx.fillStyle = color1;
			ctx.font = "10px Helvetica Neue Light";
			ctx.textBaseline = "middle";
			ctx.textAlign = "right";
			ctx.fillText(indicators[plane], widthSpacing - 10, heightSpacing * (indicators.length - plane));
		}
	}

	function update() {
		ctx.clearRect(0, 0, width, height);
		createCanvas();
	}

</script>

<svelte:window on:resize={update}></svelte:window>

<div class="over">
	<canvas bind:this={canvas} {height} {width}></canvas>
</div>