import { useEffect, useState } from 'react';

import axios from 'axios';
import { Starship } from './model/Starship';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { StarshipCard } from './components/starship-card';
import { Card } from './components/ui/card';
import { Spinner } from './components/ui/spinner';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { ProfileSidebar } from './components/profile-sidebar';
import { Navbar } from '@/components/navbar';

function App() {
	const [fields, setFields] = useState<string[]>(['', '', '']);
	const [starship, setStarship] = useState<Starship | undefined>(undefined);
	// axios.get('http://localhost:5119/50').then((response) => {
	// 	setStarship(response.data);
	// });

	useEffect(() => {
		axios.get('http://localhost:5119/random').then((response) => {
			setStarship(response.data);
		});
	}, []);

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<Navbar />
				<div className=' flex items-center justify-center p-4 my-8'>
					{starship ? (
						<StarshipCard starship={starship} />
					) : (
						<Card className='h-64 w-1/2 bg-muted rounded animate-pulse items-center justify-center flex'>
							<Spinner className='h-16 w-16' />
						</Card>
					)}
				</div>
		</ThemeProvider>
	);
}

export default App;
