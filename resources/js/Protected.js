import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Protected (props) {
	const navigate=useNavigate()
	useEffect(()=>{
		if(!localStorage.getItem('user-info'))
		{
			navigate("/login")
		}
	},[navigate])
	let Cmp=props.Cmp
	return (
		<div>
			<Cmp />
		</div>
	)
}

export default Protected
