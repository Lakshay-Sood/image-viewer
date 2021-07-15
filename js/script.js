import fetchData from '../mockServer.js';
import stateHandler from './stateHandler.js';
import {
	createListItem,
	createImageWrapper,
	setLoadingState,
	getLoadingState,
	populateThumbnailTitle,
} from './util.js';

const {
	setNextState,
	setPrevState,
	setState,
	appendListItemToState,
	appendImgWrapperToState,
} = stateHandler();

// # Append data to DOM
/**
 * @param {[{previewImage: string, title: string}]} dataList Parsed JSON data array
 */
const appendDataToDOM = (dataList) => {
	const list = document.querySelector('.list');
	const imagePreview = document.querySelector('.image-preview');
	let index = list.querySelectorAll('li').length;

	for (let i = 0; i < dataList.length; i++) {
		const data = dataList[i];
		list.appendChild(
			createListItem(data, index, appendListItemToState, setState)
		);
		imagePreview.appendChild(
			createImageWrapper(data, index, appendImgWrapperToState)
		);
		index++;
	}

	// populating thumbnail titles on initial render
	populateThumbnailTitle();
};

// ## data is the js array of objectsx

// # Step 1: Initially Populatinig the DOM with data from "API"
const res = fetchData(0, 15);
const data = res.data;
appendDataToDOM(data);

// # Step 2: Adding global event listeners
// ## UP & DOWN arrow keys functionality
window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'Down':
		case 'ArrowDown':
			event.preventDefault();
			setNextState();
			break;
		case 'Up':
		case 'ArrowUp':
			event.preventDefault();
			setPrevState();
			break;
		default:
			return;
	}
});

// ## onScroll to bottom of the list
const listEle = document.querySelector('.list');
listEle.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = listEle;

	if (scrollTop + clientHeight >= scrollHeight - 10) {
		const res = fetchData(listEle.querySelectorAll('li').length, 15);
		if (res.status === 'exceeded' || getLoadingState() === true) return;

		setLoadingState(true);
		setTimeout(() => {
			const data = res.data;
			appendDataToDOM(data);
			setLoadingState(false);
		}, 1000);
	}
});

// ## populating thumbnail title on window resize
// dynaically populating thumbnail titles in the list on every window resize
window.addEventListener('resize', () => populateThumbnailTitle());
