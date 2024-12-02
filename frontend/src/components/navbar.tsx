import { CirclePlus, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
	const navigate = useNavigate();
	return (
		<nav className='flex items-center justify-between p-4 bg-background border-b'>
			{/* <Link href="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6" /> */}
			<Button className='text-xl font-semibold bg-none rounded' onClick={() => navigate('/')}>
				<Rocket /> Starshipped
			</Button>
			{/* </Link> */}
			<div className='flex items-center space-x-4'>
				<Button
					className='rounded'
					onClick={() => {
						navigate('/new');
					}}
				>
					<CirclePlus />
				</Button>
				<ModeToggle />
			</div>
		</nav>
	);
}
