import React from 'react'
import "./Modal.css"

export const Modal = ({idlist, children, setList, data, showModal, setShowModal, showUpdate, setShowUpdate, nameItem, descriptionItem, imageItem, setNameItem, 
						setDescriptionItem, setImageItem, imagePath, setImagePath, setCheck, check, quantityItem, setQuantityItem}) => {
	async function update() {
		const formData = new FormData()
		formData.append('id',data.id)
		formData.append('name',nameItem)
		formData.append('description',descriptionItem)
		formData.append('file',imagePath)
		formData.append('quantity',quantityItem)
		let result = await fetch("http://localhost:8000/api/updateShopItem", {
				method: 'POST',
				body: formData
		})
		result = await result.json()
		let item={idlist}
		result= await fetch("http://localhost:8000/api/viewShopItem",{
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
	
	function click() {
		if (showUpdate)
		{
			if(!nameItem) {
				setCheck("Please choose a name for the item!")
				return
			}
			if(nameItem.length > 20) {
				setCheck("The name of the item must be smaller than 20 characters...")
				return
			}
			if(descriptionItem.length > 100) {
				setCheck("The name of the description must be smaller than 100 characters...")
				return
			}
			if(!quantityItem) {
				setCheck("Please set a quantity!")
				return
			}
			if(quantityItem.length > 5) {
				setCheck("The quantity must be smaller than 5 digits...")
				return
			}
			if(quantityItem < 0) {
				setCheck("Please choose a realistic quantity...")
				return
			}
			update()
			setShowModal(false)
		}
		else
		{
			setNameItem(data.name)
			if (data.description)
				setDescriptionItem(data.description)
			else
				setDescriptionItem("")
			setImageItem(data.image)
			setImagePath("")
			setQuantityItem(data.quantity)
		}
		setShowUpdate(prev => !prev)
	}
	
	async function deleteImage() {
		await fetch("http://localhost:8000/api/deleteShopImage/"+data.id,{
			method:'POST'
		})
		setShowModal(false)
	}
	
	return (
		<>
		{
			showModal ? 
				showUpdate ?
					<div className = "modalBackground">
						<div className = {"modalContainerShop" + children}>
							<div className = "closeBtn">
								<button onClick={() => setShowModal(false)}> X </button>
							</div>
							<div className = "title">
								<h1>{data.name}</h1>
								<h5 style={{color:"white"}}><b>{check}</b></h5>
							</div>
							<div className = "body">
								<div className = "test">
									<h5 className="labels">*Name:</h5><input type="text" className={"inputUpdateShop" + children} placeholder="" value={nameItem} onChange={(e)=>setNameItem(e.target.value)} /> <br /> <br />
									<h5 className="labels">Description:</h5><input type="text" className={"inputUpdateShop" + children} placeholder="" value={descriptionItem} onChange={(e)=>setDescriptionItem(e.target.value)} /> <br /> <br />
									<h5 className="labels">*Quantity:</h5><input type="number" className={"inputUpdateShop" + children} placeholder="" value={quantityItem} onChange={(e)=>setQuantityItem(e.target.value)} /> <br /> <br />
									<h5 className="labels">Picture:</h5> <br />
									{
										!data.image ?
											<input type="file" onChange={(e)=>setImagePath(e.target.files[0])} />
											:
											<div className={"deletePicture" + children}>
												<img className="userEditPicture" alt="" src={"http://localhost:8000/"+data.image} /> <button onClick={deleteImage}>X</button>
											</div>
									}
									<br/>
								</div>
							</div>
							<div className="footer">
								<br />
								<button className={"updateButtonShop" + children} onClick={click}> Save </button>
							</div>
						</div>
					</div>
					:
					<div className = "modalBackground">
						<div className = {"modalContainerShop" + children}>
							<div className = "closeBtn">
								<button onClick={() => setShowModal(false)}> X </button>
							</div>
							<div className = "title">
								<h1>{data.name}</h1>
								<h4>x{data.quantity}</h4>
							</div>
							<div className = "body">
								<div className = "description">
									<p>
										{data.description}
									</p>
									{
										!data.image ?
											null
											:
											<img className="userPicture" alt="" src={"http://localhost:8000/"+data.image} />
									}
								</div>
							</div>
							<div className="footer">
								<p><br/></p>
								<button className={"editButtonShop" + children} onClick={click}> Edit this item</button>
							</div>
						</div>
					</div> : null
		}
		</>
	)
}
