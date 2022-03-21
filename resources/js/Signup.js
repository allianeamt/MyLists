import {Button } from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import Header from './Header'

function Signup() {
	const [check, setCheck] = useState("")
	const [name,setName] = useState("")
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const navigate = useNavigate()
	useEffect(()=>{
		if(localStorage.getItem('user-info'))
		{
			navigate("/")
		}
	},[navigate])


	async function signUp() {
		if(!name) {
			setCheck("Please choose an username")
			return
		}
		if(name.length < 4 || name.length > 20) {
			setCheck("The username must be between 4 and 20 characters...")
			return
		}
		if(!email) {
			setCheck("Missing email")
			return
		}
		if(!email.toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setCheck("Invalid email address")
			return
		}
		if(!password) {
			setCheck("Please set a password")
			return
		}
		if(password.length < 4 || password.length > 20) {
			setCheck("The password must be between 4 and 20 characters...")
			return
		}
		let item={name,email,password}
    
    
		let result= await fetch("http://localhost:8000/api/signup",{
		method:'POST',
		body:JSON.stringify(item),
		headers:{
			"Content-Type":'application/json',
			"Accept":'application/json'
			}
		})
    
		result= await result.json()
		if(result && result.email) {
			localStorage.setItem("user-info",JSON.stringify(result))
			navigate("/")
		} else {
			setCheck("The mail chosen matches an existing account...")
		}
    
	}

	return (
		<>
			<Header />
			<div className="col-sm-6 offset-sm-3">
				<br /><br />
				<h1>Welcome to MyLists</h1>
				<h4>Create an account here:</h4>
				<br /><br />
				<input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Username" />
				<br />
				<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Mail" />
				<br />
				<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
				<br />
				<Button variant="dark" onClick={signUp}>Sign Up</Button>
				<br /> <br />
				<h5 className="errors"><b>{check}</b></h5>
				<h6>Do you have an account already? <Link to ="/login" className="link"><b>Click here!</b></Link></h6>
			</div>
		</>
	);
}

export default Signup;
