/**
 * @param {[{previewImage: string, title: string}]} dataList Parsed JSON data array
 */
export const populateDataToHTML = (dataList) => {
	const list = document.querySelector('.list');
	const imagePreview = document.querySelector('.image-preview');

	dataList.forEach((data, index) => {
		// populating list (without title)
		list.innerHTML += `<li data-index="${index}" ${
			index === 0 ? 'class="active"' : ''
		}>
		<img src="${data.previewImage}" />
		<span class='titleThumbnail'></span>
		</li>`;

		// populating image previews
		imagePreview.innerHTML += `<div class="image-wrapper ${
			index === 0 ? 'active' : ''
		}">
		<img src="${data.previewImage}" />
		<p class="img-title">${data.title}</p>
		</div>`;
	});

	// populating thumbnail titles on initial render
	populateThumbnailTitle(dataList);

	// dynaically populating thumbnail titles in the list on every window resize
	window.addEventListener('resize', () => populateThumbnailTitle(dataList));
};

const populateThumbnailTitle = (dataList) => {
	const titleSpan = document.querySelectorAll('.titleThumbnail');
	titleSpan.forEach((ele, index) => {
		let title = dataList[index].title;
		ele.innerHTML = title;
		if (ele.scrollWidth <= ele.clientWidth) return;

		// ////////
		let minLength = 1,
			maxLength = title.length;
		while (minLength < maxLength) {
			let midLength = Math.floor((minLength + maxLength) / 2);
			ele.textContent =
				title.substr(0, Math.floor(midLength / 2)) +
				'...' +
				title.substr(Math.ceil(-midLength / 2));
			if (ele.scrollWidth > ele.clientWidth) {
				maxLength = midLength - 1;
				ele.textContent = title;
			} else {
				minLength = midLength + 1;
				ele.textContent = title;
			}
		}
		ele.textContent =
			title.substr(0, maxLength / 2) + '...' + title.substr(-maxLength / 2);
		// ///////

		// // if entire title could fit
		// if (ele.scrollWidth <= ele.clientWidth) return;

		// let prefix = '',
		// 	suffix = '';
		// ele.innerHTML = prefix + '...' + suffix;
		// for (
		// 	let beg = 0, end = title.length - 1;
		// 	ele.scrollWidth <= ele.clientWidth;
		// 	beg++, end--
		// ) {
		// 	prefix = prefix + title[beg];
		// 	suffix = title[end] + suffix;
		// 	ele.innerHTML = prefix + '...' + suffix;
		// }

		// // reversing the last operation so avoid overflow
		// ele.innerHTML =
		// 	prefix.slice(0, prefix.length - 1) +
		// 	'...' +
		// 	suffix.slice(1, suffix.length);
	});
};

/**
 * Manages state (index) of the item (image) that has to be shown
 * @param {NodeListOf<Element>} listItems NodeList of list items (on the left)
 * @returns void
 */
export const stateHandler = (listItems) => {
	const imageWrappers = document.querySelectorAll('.image-wrapper');

	// index of currently active item
	let curState = 0;

	function toggleActiveClass(index) {
		listItems[index].classList.toggle('active');
		imageWrappers[index].classList.toggle('active');
	}

	// for DOWN key event
	function setNextState() {
		let nextState = curState + 1;
		if (nextState === listItems.length) nextState = 0;

		toggleActiveClass(curState);
		toggleActiveClass(nextState);
		curState = nextState;
	}

	// for UP key event
	function setPrevState() {
		let prevState = curState - 1;
		if (prevState === -1) prevState = listItems.length - 1;

		toggleActiveClass(curState);
		toggleActiveClass(prevState);
		curState = prevState;
	}

	// for click event
	function setState(event) {
		const clickedState = event.currentTarget.dataset.index * 1;
		if (clickedState === curState) return;

		toggleActiveClass(curState);
		toggleActiveClass(clickedState);
		curState = clickedState;
	}

	return { setNextState, setPrevState, setState };
};

export default { populateDataToHTML, stateHandler };
