import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import { Navbar } from './components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm/RegisterForm';
import RouletteFrame from './components/RouletteFrame/RouletteFrame';
import { useGetUserDetails } from './services/user.service';
import StateProvider from './state/stateContext';

function App() {
	const queryClient = new QueryClient();
	
	return (
		<QueryClientProvider client={ queryClient }>
			<StateProvider>
				<BrowserRouter>
						
					<Navbar />

					<main className="app-main">
						<Routes>
							<Route path='/' element={ <RouletteFrame /> } />
							<Route path='/register' element={ <RegisterForm /> } />
							<Route path='/login' element={ <LoginForm /> } />
						</Routes>
					</main>

				</BrowserRouter>
			</StateProvider>
		</QueryClientProvider>
	);
}

export default App;
