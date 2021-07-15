import fetchData from '../mockServer.js';
import stateHandler from './stateHandler.js';

const {
	setNextState,
	setPrevState,
	setState,
	appendListItemToState,
	appendImgWrapperToState,
} = stateHandler();

// # DOM Creator functions
const createListItem = (data, index) => {
	const li = document.createElement('li');
	li.dataset['index'] = index;
	if (index === 0) li.classList.add('active');

	const img = document.createElement('img');
	img.src = data.previewImage;

	const title = document.createElement('span');
	title.classList.add('titleThumbnail');
	title.dataset['title'] = data.title;

	li.append(img, title);
	appendListItemToState(li);
	li.addEventListener('click', (event) => setState(event));
	return li;
};

const createImageWrapper = (data, index) => {
	const imgWrapper = document.createElement('div');
	imgWrapper.classList.add('image-wrapper');
	if (index === 0) {
		imgWrapper.classList.add('active');
		console.log(index);
	}

	const img = document.createElement('img');
	img.src = data.previewImage;

	const title = document.createElement('p');
	title.classList.add('img-title');
	title.textContent = data.title;

	imgWrapper.append(img, title);
	appendImgWrapperToState(imgWrapper);
	return imgWrapper;
};

/**
 *
 * @param {Boolean} on true to set loading state ON, false to set it OFF
 */
const setLoadingState = (on) => {
	const list = document.querySelector('.list');

	if (on) {
		const loadEle = document.createElement('img');
		// const loadEle = document.createElement('span');
		// loadEle.textContent = 'Loading...';
		loadEle.classList.add('temp-loader');
		loadEle.src = './public/loader-gif.gif';

		list.appendChild(loadEle);
	} else {
		list.removeChild(list.querySelector('.temp-loader'));
	}
};

/**
 *
 * @returns {Boolean}
 */
const getLoadingState = () => {
	if (document.querySelector('.temp-loader')) return true;
	return false;
};

// # new Append
/**
 * @param {[{previewImage: string, title: string}]} dataList Parsed JSON data array
 */
export const appendDataToDOM = (dataList) => {
	const list = document.querySelector('.list');
	const imagePreview = document.querySelector('.image-preview');
	let index = list.querySelectorAll('li').length;

	for (let i = 0; i < dataList.length; i++) {
		const data = dataList[i];
		list.appendChild(createListItem(data, index));
		imagePreview.appendChild(createImageWrapper(data, index));
		index++;
	}

	// populating thumbnail titles on initial render
	populateThumbnailTitle();
};

// # new populate title
export const populateThumbnailTitle = () => {
	const titleSpans = document.querySelectorAll('.titleThumbnail');
	titleSpans.forEach((titleSpan) => {
		let title = titleSpan.dataset['title'];
		titleSpan.textContent = title;
		if (titleSpan.scrollWidth <= titleSpan.clientWidth) return;

		// ////////
		let minLength = 1,
			maxLength = title.length;
		while (minLength < maxLength) {
			let midLength = Math.floor((minLength + maxLength) / 2);
			titleSpan.textContent =
				title.substr(0, Math.floor(midLength / 2)) +
				'...' +
				title.substr(Math.ceil(-midLength / 2));
			if (titleSpan.scrollWidth > titleSpan.clientWidth) {
				maxLength = midLength - 1;
				titleSpan.textContent = title;
			} else {
				minLength = midLength + 1;
				titleSpan.textContent = title;
			}
		}
		titleSpan.textContent =
			title.substr(0, maxLength / 2) + '...' + title.substr(-maxLength / 2);
	});
};

// ## data is the js array of objectsx

// # Step 1: Initially Populatinig the DOM with data from "API"
const res = fetchData(0, 15);
const data = res.data;
appendDataToDOM(data);

// # Add event listeners
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

// # exports
// export default { populateDataToHTML, stateHandler };
// export default { appendDataToDOM, stateHandler };
export default { appendDataToDOM, populateThumbnailTitle };
