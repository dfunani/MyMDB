import { useState } from 'react'

export default function DisplayResult(props) {
	const [search, setSearch] = useState(null)
	const [searchInput, setSearchInput] = useState("")
	const [reversed, setReversed] = useState(() => ({ id: null, state: false }))
	const [selectView, setSelectView] = useState("directors")
	function handleCards(arr) {
		return arr.map((elem) => {
			return (
				<div className="App--Card">
					<img src={elem.image} alt="Known For" />
					<div><strong>{elem.title}</strong></div>
					<div><em>{elem.asCharacter}</em></div>
				</div>
			);
		});
	}

	function handleActors(arr) {
		return arr.map((elem) => {
			return (
				<div className="App--Card">
					<img src={elem.image} alt="Known For" />
					<div>{elem.name}</div>
					<div>{elem.year}</div>
					<div>{elem.role}</div>
				</div>
			);
		});
	}

	function DrawTable(arr) {
		return arr.map(elem => {
			return (
				<tr>
					<td>{elem.title}</td>
					<td>{elem.role}</td>
					<td>{elem.year}</td>
					<td>{elem.description}</td>
				</tr>
			)
		})
	}

	function DrawTable2(arr) {
		if (arr[0] && arr[0].items) {
			return (
				arr.map((e) => {
					return e.items.map(elem => {
						return (<tr>
							<td>{elem.name}</td>
							<td>{elem.description}</td>
						</tr>)
					})
				})
			)
		}
		else if (arr[0]) {
			return arr.map(elem => {
				return (<tr>
					<td>{elem.name}</td>
					<td>{elem.description}</td>
				</tr>)
			})
		}
		else if (arr.items) {
			return arr.items.map(elem => {
				return (
					<tr>
						<td>{elem.name}</td>
						<td>{elem.description}</td>
					</tr>
				)
			})
		}

	}

	function SearchTable(event, arr) {
		setSearchInput(event.target.value)
		if (arr[0] && arr[0].title) {
			setSearch(() => {
				return (arr.filter(elem => {
					let a = new RegExp(searchInput, "i")
					if (elem.title && (a.test(elem.title) || a.test(elem.role) || a.test(elem.year) || a.test(elem.description))) {
						return elem
					}
				}))
			})
		}
		else if (arr[0] && arr[0].items) {
			setSearch(() => {
				return (arr.map((e) => {
					return ({
						items: [...e.items.filter((elem) => {
							let a = new RegExp(searchInput, "i")
							if (elem.name && (a.test(elem.name) || a.test(elem.description))) {
								return elem
							}
						})],
						job: "Filtered"
					})
				}))
			})

			console.log(search)
		}
		else if (arr.items) {
			setSearch(() => {
				return (arr.items.filter((elem) => {
					let a = new RegExp(searchInput, "i")
					if (elem.name && (a.test(elem.name) || a.test(elem.description))) {
						return elem
					}
				}
				))
			}
			)
		}

	}

	function SortTable(event, arr) {
		if (reversed.id !== event.target.dataset.id) {
			setReversed(() => ({
				id: event.target.dataset.id,
				state: false
			}))
		}
		else {
			setReversed((prev) => ({
				id: prev.id,
				state: !prev.state
			}))
		}

		if (arr[0] && arr[0].title) {
			arr.sort((a, b) => {
				if (a[event.target.dataset.id] < b[event.target.dataset.id]) {
					return -1
				}
				if (a[event.target.dataset.id] > b[event.target.dataset.id]) {
					return 1
				}

				return 0
			})
		}
		else if (arr[0]) {
			arr.sort((a, b) => {
				if (a.items.map((e) => { e[event.target.dataset.name] }) < b.items.map((e) => { e[event.target.dataset.name] })) {
					return -1
				}
				if (a.items.map((e) => { e[event.target.dataset.name] }) > b.items.map((e) => { e[event.target.dataset.name] })) {
					return 1
				}

				return 0
			})
		}
		else {
			arr.items.sort((a, b) => {
				if (a[event.target.dataset.id] < b[event.target.dataset.id]) {
					return -1
				}
				if (a[event.target.dataset.id] > b[event.target.dataset.id]) {
					return 1
				}

				return 0
			})
		}



		if (reversed.state) {
			console.log(arr)
			if (arr.items) {
				arr.items.reverse()
			}
			else {

				arr.reverse()
			}
		}
		setSearch(() => {
			return arr
		})
		console.log("Done", event.target.dataset.id, arr, search)
	}

	return (
		<div className="App-Result">
			{
				props.result && props.result.title && (
					<div className="App--Shows" data-id={props.result.id}>
						<div><img src={props.result.image} className="App--Display-Image" /></div>

						<div>
							<h1>{props.result.title}</h1>
							<div>{props.result.contentRating}</div>


							<ul className="App--Display-2">
								<h1>Details</h1>
								<li>Language: {props.result.languages}</li>
								<li>Type: {props.result.type}</li>
								<li>Year: {props.result.year}</li>
								<li>Release Date: {props.result.releaseDate}</li>
								<li>Length:{props.result.runtimeStr}</li>
								<li>Plot: {props.result.plot}</li>
								<li>Genres: {props.result.genres}</li>
								<li>IMDB Rating: {props.result.imDbRating}</li>
								<li>Companies: {props.result.companies}</li>
							</ul>
						</div>
					</div>
				)
			}

			{
				props.result && props.result.name && (
					<div className="App--Display" data-id={props.result.id}>
						<div className="App--Display-1">
							<div><img src={props.result.image} className="App--Display-Image" /></div>

							<div>
								<h1><strong>{props.result.name}</strong></h1>
								<div>
									<div><em>{props.result.role}</em></div>
								</div>
								<ul className="App--Display-2">
									<li>{props.result.summary}</li>
									<li>{props.result.birthdate}</li>
									<li>{props.result.deathdate}</li>
									<li><strong>{props.result.awards}</strong></li>
									<li>{props.result.height}</li>
								</ul>
							</div>
						</div>
					</div>
				)
			}

			{
				props.result && props.result.fullCast && (
					<div className="App--Display-Row">
						<div className="App--Row">
							<h1>Actors</h1>
							<div className="App--Row-Cards">
								{handleActors(props.result.fullCast.actors)}
							</div>
						</div>
						<div className="App--Table">
							<table>
								<thead><h1>{selectView.toUpperCase()} - {props.result.fullCast[selectView] && props.result.fullCast[selectView]["items"] && props.result.fullCast[selectView]["items"].length} results</h1></thead>
								<select onChange={(e) => { setSelectView(e.target.value) }} name="displaySelect" id="displaySelect">
									<option value="directors">Directors</option>
									<option value="writers">Writers</option>
									<option value="others">Others</option>
								</select>

								<input placeholder='Filter...' value={searchInput} onChange={(e) => { SearchTable(e, props.result.fullCast[selectView]) }} type="search" name="nameSearch" id="nameSearch" />
								<thead className="Header-Row">
									<th data-id="name" onClick={(e) => { SortTable(e, props.result.fullCast[selectView]) }}>Name</th>
									<th data-id="description" onClick={(e) => { SortTable(e, props.result.fullCast[selectView]) }} >Description</th>
								</thead>
								{!search || search === [] || searchInput === "" ? DrawTable2(props.result.fullCast[selectView]) : DrawTable2(search)}
								<tfoot>End of results</tfoot>
							</table>
						</div>
					</div>
				)
			}

			{
				props.result && props.result.name && (
					<div className="App--Display-Row">
						<div className="App--Row">
							<h1><strong><em>Known For</em></strong></h1>
							<div className="App--Row-Cards">
								{handleCards(props.result.knownFor)}
							</div>
						</div>
						<div className="App--Table">
							<table>
								<thead><h1>{props.result.name} Features In {props.result.castMovies.length} Titles</h1></thead>
								<input placeholder='Filter...' value={searchInput} onChange={(e) => { SearchTable(e, props.result.castMovies) }} type="search" name="nameSearch" id="nameSearch" />
								<thead className="Header-Row">
									<th data-id="title" onClick={(e) => { SortTable(e, props.result.castMovies) }}>Title</th>
									<th data-id="role" onClick={(e) => { SortTable(e, props.result.castMovies) }}>Role</th>
									<th data-id="year" onClick={(e) => { SortTable(e, props.result.castMovies) }}>Year</th>
									<th data-id="description" onClick={(e) => { SortTable(e, props.result.castMovies) }} >Description</th>
								</thead>
								{!search || search === [] || searchInput === "" ? DrawTable(props.result.castMovies) : DrawTable(search)}
							</table>
						</div>
					</div>
				)
			}
		</div >
	);
}
