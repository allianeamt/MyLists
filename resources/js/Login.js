import Header from './Header'
import {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate,Link} from 'react-router-dom'

function Login () {
	const [check, setCheck] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()
	useEffect(()=>{
		if(localStorage.getItem('user-info'))
		{
			navigate("/")
		}
	},[navigate])

	async function login() {
		if(!email){
			setCheck("Please insert your email address")
			return
		}
		if(!email.toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setCheck("Incorrect email address")
			return
		}
		if(!password){
			setCheck("Please insert your password")
			return
		}
		if(password.length<4 || password.length>20) {
			setCheck("Incorrect password")
			return
		}
		let item = {email,password}
		let result = await fetch("http://localhost:8000/api/login",{
			method: 'POST',
			headers: {
				"Content-Type":"application/json",
				"Accept":"application/json"
			},
			body: JSON.stringify(item)
		})
		result = await result.json()
		if(result && result.email) {
			localStorage.setItem("user-info",JSON.stringify(result))
			navigate("/")
		} else {
			if(result && result.error) {
				localStorage.setItem("error",JSON.stringify(result))
				if((JSON.parse(localStorage.getItem('error')).error)==="we") {
					setCheck("Wrong email address. Please try again!")
				} else {
					setCheck("Wrong password. Please try again!")
				}
				localStorage.removeItem("error")
			} else {
				setCheck("UNEXPECTED ERROR... Please try again later!")
			}
		}
	}
	return (
		<>
			<Header />
			<div className="col-sm-6 offset-sm-3">
				<br /><br />
				<h1>Welcome back to MyLists</h1>
				<h4>Login to your account</h4>
				<br /><br />
				<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Mail" />
				<br />
				<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
				<br />
				<Button variant="dark" onClick={login}>Login</Button>
				<br /> <br />
				<h5 className="errors"><b>{check}</b></h5>
				<h6>Do you need an account? <Link to ="/signup" className="link" ><b>Click here!</b></Link></h6>
			</div>
		</>
	)
}

export default Login
