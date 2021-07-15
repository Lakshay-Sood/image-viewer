// # DOM Creator functions
export const createListItem = (
	data,
	index,
	appendListItemToState,
	setState
) => {
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

export const createImageWrapper = (data, index, appendImgWrapperToState) => {
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
export const setLoadingState = (on) => {
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
export const getLoadingState = () => {
	if (document.querySelector('.temp-loader')) return true;
	return false;
};

// # populate title
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
				title.substr(-Math.floor(midLength / 2));
			if (titleSpan.scrollWidth > titleSpan.clientWidth) {
				maxLength = midLength - 1;
				titleSpan.textContent = title;
			} else {
				minLength = midLength + 1;
				titleSpan.textContent = title;
			}
		}
		maxLength--;
		titleSpan.textContent =
			title.substr(0, Math.floor(maxLength / 2)) +
			'...' +
			title.substr(-Math.floor(maxLength / 2));
	});
};

export default {
	createListItem,
	createImageWrapper,
	setLoadingState,
	getLoadingState,
	populateThumbnailTitle,
};
