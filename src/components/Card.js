import '../styles/Card.css';

export default function Card(props) {
	return (
		<div
			id={`card${props.cardIdx}`}
			className="card"
			data-cardidx={`${props.cardIdx}`}
		>
			<img
				className="card-img"
				src={props.card.imgPath}
				alt={props.card.breed}
			/>
			{props.card.breed}
		</div>
	);
}
