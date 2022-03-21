import Header from './Header'
import {Button} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import {MdMoreVert, MdCheck, MdClose, MdDelete} from 'react-icons/md'
import { Modal } from './ModalShop'

function ShoppingList () {
	const [check, setCheck] = useState("")
	const [checkModal, setCheckModal] = useState("")
	const [name, setInput] = useState("")
	const [quantityItem, setQuantityItem] = useState("")
	const [list, setList] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [showUpdate, setShowUpdate] = useState(false)
	const [nameItem, setNameItem] = useState("")
	const [descriptionItem, setDescriptionItem] = useState("")
	const [imageItem, setImageItem] = useState("")
	const [imagePath, setImagePath] = useState("")
	const [children, setChildren] = useState(0)
	const [data, setData]=useState([])
	const namelist = JSON.parse(localStorage.getItem('this-list')).name
	const idlist = JSON.parse(localStorage.getItem('this-list')).id
	
	async function openModal (id) {
		let result = await fetch("http://localhost:8000/api/getShopItem/"+id)
		result = await result.json()
		let x = 0;
		list.map((item)=>
			item.done ?
			item.id === id ?
			setChildren(5)
			:
			null
			:
			item.id === id ?
			setChildren(x)
			:
			x=(x+1)%5
		)
		setData(result)
		setNameItem(data.name)
		setDescriptionItem(data.description)
		setImageItem(data.image)
		setQuantityItem(data.quantity)
		setImagePath("")
		setCheckModal("")
		setShowUpdate(false)
		setShowModal(prev => !prev)
	}
	
	async function update ()
	{
		let item={idlist}
		let result= await fetch("http://localhost:8000/api/viewShopItem",{
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
	
	async function click () {
		if(!name) {
			setCheck("Please choose a name for the item!")
			return
		}
		if(name.length > 25) {
			setCheck("The name of the item must be smaller than 25 characters...")
			return
		}
		setCheck("")
		let item={idlist, name}
		let result = await fetch("http://localhost:8000/api/addShopItem",{
			method:'POST',
			body:JSON.stringify(item),
			headers:{
				"Content-Type":'application/json',
				"Accept":'application/json'
			}
		})
		result= await result.json()
		await openModal(result.id)
			setNameItem(result.name)
			if (result.description)
				setDescriptionItem(result.description)
			else
				setDescriptionItem("")
			setImagePath("")
			setQuantityItem(1)
		setShowUpdate(true)
		update()
		setInput("")
	}
	
	async function deleteItem (id)
	{
		await fetch("http://localhost:8000/api/deleteShopItem/"+id,{
			method:'DELETE'
		})
		update()
	}
	
	async function checkItem (id)
	{
		await fetch("http://localhost:8000/api/updateShopCheck/"+id,{
			method:'POST'
		})
		update()
	}
	
	return (
		<div>
			<Modal children={children} quantityItem={quantityItem} setQuantityItem={setQuantityItem} data={data} idlist={idlist} check={checkModal} setCheck={setCheckModal} setList={setList} imagePath={imagePath} setImagePath={setImagePath} nameItem={nameItem} 
			descriptionItem={descriptionItem} imageItem={imageItem} setNameItem={setNameItem} setDescriptionItem={setDescriptionItem} 
			setImageItem={setImageItem} showModal={showModal} setShowModal={setShowModal} showUpdate={showUpdate} setShowUpdate={setShowUpdate} />
			<Header />
			<br /><br />
			<b><h1>{namelist}</h1></b>
			<h5 className="errors"><b>{check}</b></h5>
			<div className="organizer">
				<div className="todo-form">
					<input type='text' placeholder='Add something to do' value={name} className='todo-input' onChange={(e)=>setInput(e.target.value)} />
					<Button className='todo-button' onClick={click}>Add</Button>
					<div>
					{
						<div>
						{
						list.map((item)=>
							item.done ? 
								null
								:
								<div className="todo-row-shop" key={item.id}>{item.name} x{item.quantity}
									<div className="icons">
										{
											item.done ?
												<MdClose className='check-icon' onClick={()=>checkItem(item.id,item.done)} />
												:
												<MdCheck className='check-icon' onClick={()=>checkItem(item.id,item.done)} />
										}	
										<MdMoreVert className='edit-icon' onClick={()=>openModal(item.id)} />
										<MdDelete className='delete-icon' onClick={()=>deleteItem(item.id)} />
									</div>
								</div>
						)
						}
						{
						list.map((item)=>
							item.done ? 
								<div className="todo-row-cut-shop" key={item.id}>{item.name}
									<div className="icons">
										{
											item.done ?
												<MdClose className='check-icon' onClick={()=>checkItem(item.id,item.done)} />
												:
												<MdCheck className='check-icon' onClick={()=>checkItem(item.id,item.done)} />
										}
										<MdMoreVert className='edit-icon' onClick={()=>openModal(item.id)} />
										<MdDelete className='delete-icon' onClick={()=>deleteItem(item.id)} />
									</div>
								</div>
								:
								null
						)
						}
						</div>
					}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShoppingList
