import { useEffect, useState } from 'react';
import Card from './components/Card.js';

function App() {
	const [bestScore, setBestScore] = useState(0);
	const [currScore, setCurrScore] = useState(0);
	const [cardList, setCardList] = useState(
		shuffle(
			[...Array(15).keys()].map((val) => {
				return {
					value: val,
					clicked: false,
				};
			})
		)
	);

	useEffect(() => {
		for (let i = 0; i < cardList.length; i += 1) {
			const currCardElement = document.querySelector(`div#card${i}`);
			currCardElement.removeEventListener('click', handleClick);
			currCardElement.addEventListener('click', handleClick);
		}

		return () => {
			for (let i = 0; i < cardList.length; i += 1) {
				const currCardElement = document.querySelector(`div#card${i}`);
				currCardElement.removeEventListener('click', handleClick);
			}
		};
	});

	function shuffle(arr) {
		const arrCopy = [...arr];
		let currIdx = arrCopy.length;
		let randomIdx;

		while (currIdx !== 0) {
			randomIdx = Math.floor(Math.random() * currIdx);
			currIdx--;

			[arrCopy[currIdx], arrCopy[randomIdx]] = [
				arrCopy[randomIdx],
				arrCopy[currIdx],
			];
		}

		return arrCopy;
	}

	const resetCards = (arr) => {
		return arr.map((currCard) => {
			return { value: currCard.value, clicked: false };
		});
	};

	const handleClick = (e) => {
		if (!cardList[e.target.dataset.cardidx].clicked) {
			cardList[e.target.dataset.cardidx].clicked = true;
			setCurrScore(currScore + 1);
			setCardList(shuffle(cardList));
		} else {
			if (currScore > bestScore) setBestScore(currScore);
			setCurrScore(0);
			setCardList(shuffle(resetCards(cardList)));
		}
	};

	return (
		<div className="App">
			<h3>Best Score: {bestScore}</h3>
			<h3>Current Score: {currScore}</h3>
			{cardList.map((currCard, idx) => {
				return (
					<Card
						key={currCard.value.toString()}
						card={currCard}
						cardIdx={idx}
					/>
				);
			})}
		</div>
	);
}

export default App;
