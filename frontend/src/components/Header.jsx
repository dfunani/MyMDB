export default function Header(props)
{ 
	
	return (
		<nav className="App-Header">
			<div className="App--Title">
				<img src={props.logo} alt="logo" data-id="Welcome" onClick={(e) => props.setView(e)} />
				<p data-id="Welcome" onClick={(e) => props.setView(e)}>MyMDB</p>
			</div>
			<div className="App--Menu">
				<div data-id="Artists" onClick={(e) => props.setView(e)} className={`App--Menu-Tab ${props.view === "Artists" && "Pressed"}`}>Artists</div>
				<div data-id="Movies" onClick={(e) => props.setView(e)} className={`App--Menu-Tab ${props.view === "Movies" && "Pressed"}`}>Movies</div>
				<div data-id="Series" onClick={(e) => props.setView(e)} className={`App--Menu-Tab ${props.view === "Series" && "Pressed"}`}>Series</div>
			</div>
		</nav>
	)
}