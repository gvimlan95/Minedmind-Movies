import { useEffect, useState } from 'react';
import Card from '../components/Card';

function Section({ genre }) {
	const [movies, setMovies] = useState(null);
	const [pageState, setPageState] = useState(null);

	const fetchData = async () => {
		const response = await fetch('/.netlify/functions/getMovies', {
			method: 'POST',
			body: JSON.stringify({ genre: genre, pageState: pageState }),
		});
		const responseBody = await response.json();
		setMovies(responseBody.data.movies_by_genre.values);
		setPageState(responseBody.data.movies_by_genre.pageState);
		// console.log(responseBody);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div>
				<h2 id={genre}>{genre}</h2>
				{movies && (
					<div className="movie-section">
						{movies.map((movie, index) => (
							<Card key={index} movie={movie} />
						))}
						<div
							onClick={() => {
								fetchData();
							}}
							className="more-button"></div>
					</div>
				)}
			</div>
		</>
	);
}

export default Section;
