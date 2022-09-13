export default function ListItem(props)
{
	
	return (
		<div className="App--List-Result">
			
			<div className="App--List--ImgDetail">
				{JSON.stringify(props.list.title)}
				</div>
				<div className="App--List--ImgDetail">
				{JSON.stringify(props.list.description)}
			</div>
			<img data-id={`Result-${props.action}`} data-name={props.list.id} name={`${props.view} ${props.list.id}`} onClick={(e) => {
			props.handleSetViewPassed(e)
		}} src={props.list.image} alt={JSON.stringify(props.list.id)} />
			</div>
	)
}
