import '../styles/Card.css';

export default function Card(props) {
	return (
		<div
			id={`card${props.cardIdx}`}
			className="card"
			data-cardidx={`${props.cardIdx}`}
		>
			{props.card.value}
		</div>
	);
}
