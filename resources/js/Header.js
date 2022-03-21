import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

function Header () {
	const navigate = useNavigate()
	let user = JSON.parse(localStorage.getItem('user-info'))
	function Logout () {
		localStorage.removeItem("user-info")
		navigate("/")
	}
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as ={Link} to ={"/"}>Home</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto" />
						<Nav>
						{
							localStorage.getItem('user-info') ?
								<>
									<NavDropdown title={user && user.name}>
										<NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
									</NavDropdown>
								</>
								:
								<>
									<Nav.Link as ={Link} to ={"/login"}>Login</Nav.Link>
									<Nav.Link as ={Link} to ={"/signup"}>Sign up</Nav.Link>
								</>
						}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default Header
