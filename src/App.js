import { useState } from 'react';
import Card from './components/Card.js';

function App() {
	// const [bestScore, setBestScore] = useState(0);
	// const [currScore, setCurrScore] = useState(0);
	const [cardList, setCardList] = useState([
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	]);

	const shuffle = (arr) => {
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
	};

	const handleClick = (e) => {
		setCardList(shuffle(cardList));
	};

	return (
		<div className="App">
			{cardList.map((currCard, idx) => {
				return <Card key={idx} name={currCard} />;
			})}
			<button onClick={handleClick}>Shuffle!</button>
		</div>
	);
}

export default App;
