export default function Footer(props)
{
	return (
		<footer onClick={() => window.location.href = props.imdb}>
			<div className="App-Footer">
				Power By: IMDB-API
				</div>
		</footer>
	)
}