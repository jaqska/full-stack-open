const Filter = (props) => {
  return (
  <div>
    filter shown with <input 
    value={props.newFilterName}
    onChange={props.handleFilterInput}/>
  </div>
  )
}

export default Filter