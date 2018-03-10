/*
	These arrays represent sections of the grid
	Each array element represents an (x,y) coordinate i.e. one cell of the 5x5 grid
*/
const TR = [55];
const TL = [51];
const BR = [15];
const BL = [11];
const C = [22, 23, 24, 32, 33, 34, 42, 43, 44];
const TC = [52, 53, 54];
const RC = [25, 35, 45];
const BC = [12, 13, 14];
const LC = [21, 31, 41];
/*
	Grid divided into the following sections: 
	TR => Top Right-hand Corner Section (composed of 1 grid cell)
	TL => Top Left-hand Corner Section (composed of 1 grid cell)
	BR => Bottom Right-hand Corner Section (composed of 1 grid cell)
	BL => Bottom Left-hand Corner Section (composed of 1 grid cell)
	C => Center Section (composed of 9 grid cells)
	TC => Top Center Section (composed of 3 grid cells)
	RC => Right Center Section (composed of 3 grid cells)
	BC => Bottom Center Section (composed of 3 grid cells)
	LC => Left Center Section (composed of 3 grid cells)
*/
const GRID = [TR, TL, BR, BL, C, TC, RC, BC, LC];
// The state represents current coordinates (cor) and facing direction (dir) of robot 
var state = {
	cor: null,
	dir: null
}

// User input places robot on the grid, giving it a position(x,y) and facing direction  
function place() {
	while (true) {
		var direction = prompt("Enter a direction (north, south, east, west) that you want the robot to face").toUpperCase();
		if (!direction || /^(NORTH|SOUTH|EAST|WEST)$/.test(direction)) {
			state.dir = direction;
			break;
		} else {
			alert("Please enter a valid direction");
		}
	}
	while (true) {
		var x = prompt("Enter an x coordinate between 1 to 5");
		if (!x || /^[1-5]$/.test(x)) {
			xcor = x;
			break;
		} else {
			alert("Please enter a valid number between 1 to 5");
		}
	}
	while (true) {
		var y = prompt("Enter a y coordinate between 1 to 5");
		if (!y || /^[1-5]$/.test(y)) {
			ycor = y;
			break;
		} else {
			alert("Please enter a valid number between 1 to 5");
		}
	}
	coorString = xcor + ycor
	state.cor = parseInt(coorString);
	console.log("Robot has been placed at " + xcor + ", " + ycor + " facing " + state.dir);
}

// Reports current position(x,y) and facing direction of robot
function report() {
	if (state.cor !== null && state.cor !== undefined) {
		var coordinates = state.cor.toString();
		var x = coordinates[0];
		var y = coordinates[1];
		console.log("Robot is at " + x + ", " + y + ", " + state.dir);
	} else {
		console.log("The robot has not been placed on the table yet.")
	}
}

function move() {
	if (state.dir !== null && state.dir !== undefined && state.dir !== '') {
		// Find robot's postion on the grid
		var targetSection = null;
		for (i = 0; i < GRID.length; i++) {
			for (j = 0; j < GRID[i].length; j++) {
				if (state.cor === GRID[i][j]) {
					targetSection = GRID[i];
				}
			}
		}
		// Allow robot to traverse the grid with valid moves 
		if (state.dir === 'WEST' && (targetSection !== TL) && (targetSection !== LC) && (targetSection !== BL)) {
			state.cor -= 1;
		} else if (state.dir === 'SOUTH' && (targetSection !== BL) && (targetSection !== BC) && (targetSection !== BR)) {
			state.cor -= 10;
		} else if (state.dir === 'EAST' && (targetSection !== TR) && (targetSection !== RC) && (targetSection !== BR)) {
			state.cor += 1;
		} else if (state.dir === 'NORTH' && (targetSection !== TL) && (targetSection !== TC) && (targetSection !== TR)) {
			state.cor += 10;
		} else {
			console.log("Invalid move.")
		}
		var coordinates = state.cor.toString();
		var x = coordinates[0];
		var y = coordinates[1];
		console.log("Robot is at " + x + ", " + y + ", " + state.dir);
	} else {
		console.log("The robot has not been placed on the table yet.")
	}
}

// Change robot's facing direction to the left
function left() {
	if (state.dir !== undefined && state.dir !== null && state.dir !== '') {
		switch (state.dir) {
			case 'NORTH': {
				state.dir = 'WEST';
				console.log("Robot is now facing " + state.dir);
				return state;
			}
			case 'WEST': {
				state.dir = 'SOUTH'
				console.log("Robot is now facing " + state.dir);
				return state;
			}
			case 'SOUTH': {
				state.dir = 'EAST';
				console.log("Robot is now facing " + state.dir);
				return state;
			}
			case 'EAST': {
				state.dir = 'NORTH'
				console.log("Robot is now facing " + state.dir);
				return state;
			}
		}
	} else {
		console.log("The robot has not been placed on the table yet.")
	}
}

// Change robot's facing direction to the right
function right() {
	if (state.dir !== undefined && state.dir !== null && state.dir !== '') {
		switch (state.dir) {
			case 'NORTH': {
				state.dir = 'EAST';
				console.log("Robot is now facing " + state.dir);
				return state.dir;
			}
			case 'EAST': {
				state.dir = 'SOUTH';
				console.log("Robot is now facing " + state.dir);
				return state.dir;
			}
			case 'SOUTH': {
				state.dir = 'WEST';
				console.log("Robot is now facing " + state.dir);
				return state.dir;
			}
			case 'WEST': {
				state.dir = 'NORTH';
				console.log("Robot is now facing " + state.dir);
				return state.dir;
			}
		}
	} else {
		console.log("The robot has not been placed on the table yet.")
	}
}