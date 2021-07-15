/**
 * Manages state (index) of the item (image) that has to be shown
 * @param {NodeListOf<Element>} listItems NodeList of list items (on the left)
 * @returns void
 */
export const stateHandler = () => {
	// const imageWrappers = document.querySelectorAll('.image-wrapper');
	let listItems = [],
		imageWrappers = [];

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
		listItems[curState].scrollIntoView(false);
	}

	// for UP key event
	function setPrevState() {
		let prevState = curState - 1;
		if (prevState === -1) prevState = listItems.length - 1;

		toggleActiveClass(curState);
		toggleActiveClass(prevState);
		curState = prevState;
		listItems[curState].scrollIntoView(true);
	}

	// for click event
	function setState(event) {
		const clickedState = event.currentTarget.dataset.index * 1;
		if (clickedState === curState) return;

		toggleActiveClass(curState);
		toggleActiveClass(clickedState);
		curState = clickedState;
	}

	// for appending new list item to the state
	function appendListItemToState(li) {
		listItems.push(li);
	}
	// for appending new image wrapper to the state
	function appendImgWrapperToState(imgWrapper) {
		imageWrappers.push(imgWrapper);
	}

	return {
		setNextState,
		setPrevState,
		setState,
		appendListItemToState,
		appendImgWrapperToState,
	};
};

export default stateHandler;
