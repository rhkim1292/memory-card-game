import { useEffect, useState } from 'react';
import Card from './components/Card.js';
import './styles/App.css';
import yorkie from './images/yorkie.png';
import jindo from './images/jindo.jpg';
import gershep from './images/gershep.png';
import ausshep from './images/ausshep.jpg';
import golden from './images/golden.jpg';
import samoyed from './images/samoyed.jpg';

function App() {
	const [bestScore, setBestScore] = useState(0);
	const [currScore, setCurrScore] = useState(0);
	const [cardList, setCardList] = useState(
		shuffle([
			{
				breed: 'Yorkie',
				imgPath: yorkie,
				clicked: false,
			},
			{
				breed: 'Jindo',
				imgPath: jindo,
				clicked: false,
			},
			{
				breed: 'German Shepherd',
				imgPath: gershep,
				clicked: false,
			},
			{
				breed: 'Australian Shepherd',
				imgPath: ausshep,
				clicked: false,
			},
			{
				breed: 'Golden Retriever',
				imgPath: golden,
				clicked: false,
			},
			{
				breed: 'Samoyed',
				imgPath: samoyed,
				clicked: false,
			},
		])
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
			return {
				breed: currCard.breed,
				imgPath: currCard.imgPath,
				clicked: false,
			};
		});
	};

	const handleClick = (e) => {
		if (!cardList[e.currentTarget.dataset.cardidx].clicked) {
			cardList[e.currentTarget.dataset.cardidx].clicked = true;
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
			<div className="card-list-container">
				{cardList.map((currCard, idx) => {
					return (
						<Card
							key={currCard.breed}
							card={currCard}
							cardIdx={idx}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
