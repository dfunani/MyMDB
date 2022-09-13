import MultipleResultsView from "./MultipleResultsView"


export default function Main(props) {
	function handleSetView(event) {
		console.log("main", event.target.dataset.id)
		props.setView(event)
	}
	return (
		<main className="App-Main">
			<div className="App--Main-Input">
				<input autoFocus required onChange={(event) => { props.handleInput(event) }} value={props.searchInput} type="search" placeholder={`Search from ${props.view}`} name="search" data-id={props.view} />
				<button onClick={(event) => { props.searchInput && props.handleSearch(event) }} data-id={props.view}>Find {props.view}</button>
			</div>
			{props.searchResults && props.searchResults.results && props.searchResults.results.length > 1 &&
				<div>{props.view} search results for <strong>'{props.searchInput}'</strong>:
					<div style={{ textAlign: "left" }}>Results showing: {props.searchResults.results.length}</div><MultipleResultsView action={props.searchResults.searchType} handleSetView={handleSetView} view={props.view} input={props.searchInput} results={props.searchResults.results} />
				</div>
			}

			{props.searchResults === "" && !props.searching && <h1>{`Search ${props.view}...`}</h1>}

			{props.searching && <h1>{`Searching ${props.view}...Please give it a moment...`}</h1>}

			{props.searchResults && !props.searching && (!props.searchResults.results || props.searchResults.results.length < 1) && <h1>{`No ${props.view} found...Search again...`}</h1>}
		</main>
	)
}