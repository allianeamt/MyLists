import Header from './Header'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import React,{useState, useEffect} from 'react'
import "./App.css"
import BgShopping from "./pictures/bgTodoMain.png"

function Shopping () {
	const navigate = useNavigate();
	const [check, setCheck] = useState("")
	const [name, setName] = useState("")
	const [list, setList] = useState([])
	const id = JSON.parse(localStorage.getItem('user-info')).id
	
	async function update () {
		let item={id}
		let result= await fetch("http://localhost:8000/api/viewShopList",{
			method:'POST',
			body:JSON.stringify(item),
			headers:{
				"Content-Type":'application/json',
				"Accept":'application/json'
			}
		})
		result= await result.json()
		setList(result)
	}
	
	useEffect( ()=>{
		update()
	},[])
	
	async function createList () {
		if(!name) {
			setCheck("Please choose a name for the list!")
			return
		}
		if(name.length > 20) {
			setCheck("The name of the list must be smaller than 20 characters...")
			return
		}
		let item={id,name}
		let result= await fetch("http://localhost:8000/api/addShopList",{
			method:'POST',
			body:JSON.stringify(item),
			headers:{
				"Content-Type":'application/json',
				"Accept":'application/json'
			}
		})
		result= await result.json()
		if(result && result.name) {
			localStorage.setItem("this-list",JSON.stringify(result))
			navigate("/shoppinglist")
		}
	}
	
	function goToList (id, name, id_user)
	{
		let item={id, name, id_user}
		localStorage.setItem("this-list",JSON.stringify(item))
		navigate("/shoppinglist")
	}
	
	async function deleteList (id)
	{
		await fetch("http://localhost:8000/api/deleteShopList/"+id,{
			method:'DELETE'
		})
		update()
	}
	
	return (
		<div>
			<Header />
			<img src={BgShopping} alt="" />
			<div className="col-sm-6 offset-sm-3">
				<h5 className="errors"><b>{check}</b></h5>
				<br />
				<input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder = "Name of the list"></input><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Button onClick={createList} variant="dark">Create new list</Button>
				<br /><br />
				<h3>Lists you already have:</h3>
				<div className="listOfLists">
				{
					list.map((item)=>
						<div key={item.id}>
							<Button className='list-button' onClick={()=>goToList(item.id,item.name,item.id_user)}>{item.name}</Button>
							<Button className='delete-button' onClick={()=>deleteList(item.id)}>delete</Button>
						</div>
					)
				}
				</div>
			</div>
		</div>
	)
}

export default Shopping
