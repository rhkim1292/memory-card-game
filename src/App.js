import { useEffect, useState } from 'react';
import Card from './components/Card.js';
import './styles/App.css';
import yorkie from './images/yorkie.png';
import jindo from './images/jindo.png';
import gershep from './images/gershep.png';
import ausshep from './images/ausshep.jpg';
import golden from './images/golden.png';
import samoyed from './images/samoyed.png';
import maltipoo from './images/maltipoo.png';
import corgi from './images/corgi.jpeg';
import frenchie from './images/frenchie.jpg';
import shiba from './images/shiba.png';
import dalmatian from './images/dalmatian.jpg';
import poodle from './images/poodle.jpg';
import greatdane from './images/greatdane.png';
import chowchow from './images/chowchow.jpg';
import rottweiler from './images/rottweiler.jpg';

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
			{
				breed: 'Maltipoo',
				imgPath: maltipoo,
				clicked: false,
			},
			{
				breed: 'Corgi',
				imgPath: corgi,
				clicked: false,
			},
			{
				breed: 'French Bulldog',
				imgPath: frenchie,
				clicked: false,
			},
			{
				breed: 'Shiba Inu',
				imgPath: shiba,
				clicked: false,
			},
			{
				breed: 'Dalmatian',
				imgPath: dalmatian,
				clicked: false,
			},
			{
				breed: 'Standard Poodle',
				imgPath: poodle,
				clicked: false,
			},
			{
				breed: 'Great Dane',
				imgPath: greatdane,
				clicked: false,
			},
			{
				breed: 'Chow Chow',
				imgPath: chowchow,
				clicked: false,
			},
			{
				breed: 'Rottweiler',
				imgPath: rottweiler,
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
			<header>
				<h1>Doggy Breed Memory Game</h1>
				<span>
					Click on as many dog breeds as you can without clicking the
					same breed twice!
				</span>
				<div className="score-container">
					<h3 className="curr-score">Current Score: {currScore}</h3>
					<h3 className="best-score">Best Score: {bestScore}</h3>
				</div>
			</header>
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
