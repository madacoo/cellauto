
let rule = (n) => {
	let s = n.toString(2);
	while (s.length < 8) {
		s = '0' + s;
	}
	return s;
};

let evolve = (rule, left, middle, right) => {
	let index = 7 - parseInt(left + middle + right, 2);
	return rule[index];
}

let tick = (state, n) => {
	// Take a state and a rule n, return the next state.
	// Assume the state is toroidal.
	let nextState = [];
	let r = rule(n);
	nextState.push(evolve(r, state[state.length-1], state[0], state[1]));
	for (let i = 1; i < state.length-1; i++) {
		nextState.push(evolve(r, state[i-1], state[i], state[i+1]))
	}
	nextState.push(evolve(r, state[state.length-2], state[state.length-1], state[0]));
	return nextState.join('');
}

let draw = (row, state) => {
	let x = 0;
	let y = cellSize*row;
	ctx.strokeStyle = 'white';
	for (let i = 0; i < state.length; i++) {
		let color = state[i] == '0' ? 'gold' : 'black';
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.rect(x, y, cellSize, cellSize);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		x += cellSize;
	}
};

let randomState = (n) => {
	let s = '';
	for (let i = 0; i < n; i++) {
		let val = Math.random() < 0.5 ? '0' : '1';
		s += val;
	}
	return s;
};

let middleBit = (size) => {
	let s = '1';
	for (let i = 0; i < size; i++) {
		s = '0' + s + '0';
	}
	return s;
};

window.onload = () => {
	//state = randomState(200);
	state = middleBit(16);
	
	rows = 16;
	cellSize = 20;
	
	cnv = document.getElementById('canvas');
	cnv.width = state.length*cellSize;
	cnv.height = rows*cellSize;
	ctx = cnv.getContext('2d');
	let r = 161 //rule(Math.floor(Math.random()*256));
	document.getElementById('rule').innerHTML = "rule: " + parseInt(r, 2);
	for (let i = 0; i < rows; i++) {
		
		draw(i, state);
		state = tick(state, r);
	}
};


