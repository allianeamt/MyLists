import Header from './Header'
import { useNavigate } from 'react-router-dom'
import Image1 from "./pictures/tbutton.png"
import Image2 from "./pictures/sbutton.png"
import Title from "./pictures/title.png"
import "./App.css"

function Home () {
	const navigate = useNavigate();
	function shop () {
		localStorage.getItem('user-info') ?
			navigate("/shopping")
			:
			navigate("/login")
	}
	function todo () {
		localStorage.getItem('user-info') ?
			navigate("/todo")
			:
			navigate("/login")
	}
	return (
		<div>
			<Header />
			<br />
			<img src={Title} alt="" />
			<br /><br /><br />
			<img alt="" width="300" height="300" src={Image2} onClick={shop} className="boxy" /> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
			<img alt="" width="300" height="300" src={Image1} onClick={todo} className="boxy" />
		</div>
	)
}

export default Home
