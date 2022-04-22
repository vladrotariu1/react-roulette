import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm/RegisterForm';
import RouletteFrame from './components/RouletteFrame/RouletteFrame';

function App() {

	return (
		<BrowserRouter>
			
			<Navbar />

			<main className="app-main">
				<Routes>
					<Route path='/' element={ <RouletteFrame /> } />
					<Route path='/register' element={ <RegisterForm /> } />
					<Route path='/login' element={ <div>Login</div> } />
				</Routes>
			</main>

		</BrowserRouter>
	);
}

export default App;
