import { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { Starship } from './model/Starship';
import { ThemeProvider } from './components/theme-provider';
import { StarshipCard } from './components/starship-card';
import { Card } from './components/ui/card';
import { Spinner } from './components/ui/spinner';
import { Navbar } from '@/components/navbar';
import { Route, Routes, useParams } from 'react-router-dom';
import { EmptyStarshipCard } from './components/empty-starship-card';

function App() {
	const [fields, setFields] = useState<string[]>(['', '', '']);
	
	
	const Main = () => {
		const params = useParams()
		const [starship, setStarship] = useState<Starship | undefined>(undefined);
		const [loading, setIsLoading] = useState(true);
		// axios.get('http://localhost:5119/random').then((response) => {
		// 	setStarship(response.data);
		// });
		const id = params.id; 
		console.log("id",)
		const url = id === undefined ? "http://localhost:5119/random" : `http://localhost:5119/${id}`
		useMemo(() => {
			axios.get(url).then((response) => {
				setStarship(response.data);
				setIsLoading(false)
			}).catch(err => {
				setIsLoading(false)
			})
		}, [])
		// useEffect(() => {
		// 	id === "" ?
		// 	axios.get('http://localhost:5119/random').then((response) => {
		// 		setStarship(response.data);
		// 	}) 
		// }, []);
		return (
			<>
				<Navbar />
				<div className=' flex items-center justify-center p-4 my-8'>
					{!loading ? (
						starship ? 
							<StarshipCard starship={starship} />
							: <EmptyStarshipCard />
					) : (
						<Card className='h-64 w-1/2 bg-muted rounded animate-pulse items-center justify-center flex'>
							<Spinner className='h-16 w-16' />
						</Card>
					)}
				</div>
			</>
		);
	};

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<Routes>
				<Route path='/' element={<Main />}>
					{/* <Main /> */}
				</Route>
				<Route path='/:id' element={<Main />}>
					{/* <Main /> */}
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
