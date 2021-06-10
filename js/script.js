import { populateDataToHTML, stateHandler } from './util.js';
import data from './../data.json' assert { type: 'json' };

// ## Step 1: Populatinig the DOM with data from JSON file
populateDataToHTML(data);

// ## Step 2: Add event listeners
const listItems = document.querySelectorAll('.list>li');

const { setNextState, setPrevState, setState } = stateHandler(listItems);

// ## onClick functionality
listItems.forEach((li) => {
	li.addEventListener('click', (event) => setState(event));
});

// ## UP & DOWN arrow keys functionality
window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'Down':
		case 'ArrowDown':
			setNextState();
			break;
		case 'Up':
		case 'ArrowUp':
			setPrevState();
			break;
		default:
			return;
	}
});
