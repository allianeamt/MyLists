import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Shopping from './Shopping'
import ToDo from './ToDo'
import Protected from './Protected'
import ToDoList from './ToDoList'
import ShoppingList from './ShoppingList'
import React from 'react';
import ReactDOM from 'react-dom';

function App2() {
	return (
		<div className="App">
			<BrowserRouter >
				<Routes>
					<Route path = "" element = {<Home />} />
					<Route path = "/login" element = {<Login />} />
					<Route path = "/signup" element = {<Signup />} />
					<Route path = "/shopping" element = {<Protected Cmp={Shopping} />} />
					<Route path = "/todo" element = {<Protected Cmp={ToDo} />} />
					<Route path = "/todolist" element = {<Protected Cmp = {ToDoList} />} />
					<Route path = "/shoppinglist" element = {<Protected Cmp = {ShoppingList} />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App2;

if (document.getElementById('example')) {
    ReactDOM.render(<App2 />, document.getElementById('example'));
}
