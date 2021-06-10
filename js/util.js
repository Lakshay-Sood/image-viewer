export const populateDataToHTML = (dataList) => {
	const list = document.querySelector('.list');
	const imagePreview = document.querySelector('.image-preview');

	dataList.forEach((data, index) => {
		// minimise large title strings
		let titleThumbnail = data.title;
		if (titleThumbnail.length > 35) {
			let prefix = titleThumbnail.slice(0, 16).trim();
			let suffix = titleThumbnail.slice(-15).trim();
			titleThumbnail = prefix + '...' + suffix;
		}

		// populating list
		list.innerHTML += `<li data-index="${index}" ${
			index === 0 ? 'class="active"' : ''
		}>
		<img src="${data.previewImage}" />
		<span>${titleThumbnail}</span>
	</li>`;

		// populating image previews
		imagePreview.innerHTML += `<div class="image-wrapper ${
			index === 0 ? 'active' : ''
		}">
		<img src="${data.previewImage}" />
	<p class="img-title">${data.title}</p>
</div>`;
	});
};

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
