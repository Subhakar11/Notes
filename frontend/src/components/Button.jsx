export default function Button(props){
  return <button {...props} className={`button ${props.className||''}`}/>
}