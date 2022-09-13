import ListItem from "./ListItem"

export default function MultipleResultsView(props)
{
	function handleSetViewPassed(event)
	{
		console.log("multi", event.target.dataset.id)
		props.handleSetView(event)
	}

	let list = []
	for (let i = 0; i < props.results.length; i++)
	{
		list.push(<ListItem action={props.action} view={props.view} handleSetViewPassed={handleSetViewPassed} list={props.results[i]}/>)
		}
	return (
			<div className="App--List">
				
					{list}
		</div>
		)
} 