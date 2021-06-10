function stateHandler(listItems) {
	const imageWrappers = document.querySelectorAll('.image-wrapper');

	// index of currently active item
	let curState = 0;

	function toggleActiveClass(index) {
		listItems[index].classList.toggle('active');
		imageWrappers[index].classList.toggle('active');
	}

	function setNextState() {
		let nextState = curState + 1;
		if (nextState === listItems.length) nextState = 0;

		toggleActiveClass(curState);
		toggleActiveClass(nextState);
		curState = nextState;
	}

	function setPrevState() {
		let prevState = curState - 1;
		if (prevState === -1) prevState = listItems.length - 1;

		toggleActiveClass(curState);
		toggleActiveClass(prevState);
		curState = prevState;
	}

	function setState(event) {
		const clickedState = event.currentTarget.dataset.index * 1;
		if (clickedState === curState) return;

		toggleActiveClass(curState);
		toggleActiveClass(clickedState);
		curState = clickedState;
	}

	return { setNextState, setPrevState, setState };
}

export default stateHandler;
