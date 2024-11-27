import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Starship } from '@/model/Starship';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function StarshipCard({ starship }: { starship: Starship }) {
	const navigate = useNavigate();
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>{starship?.name ?? 'Starship'} : (id: {starship.id})</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div key='model' className='items-center space-x-2'>
					<Label>Model</Label>
					<Input
						disabled
						value={starship?.model}
						placeholder={`N/A`}
					/>
				</div>
				<div key='manufacturer' className='items-center space-x-2'>
					<Label>Manufacturer</Label>
					<Input
						disabled
						value={starship?.manufacturer}
						placeholder={`N/A`}
					/>
				</div>
				<div key='pilots' className='items-center space-x-2'>
					<>
						<Label>Pilots</Label>
						{starship?.pilots.length > 0 ? (
							starship?.pilots.map((p) => (
								<Input
									value={p}
									disabled
									placeholder={`N/A`}
								/>
							))
						) : (
							<Input
								value={'No Pilots Fly this ship.'}
								disabled
								placeholder={`N/A`}
							/>
						)}
					</>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<div>
					<Button
						onClick={() =>
							axios.delete(`http://localhost:5119/${starship.id}`)
								.then(() => {
									alert('Starship Deleted')
									navigate("/")
								})
						}
					>
						Delete
					</Button>
				</div>
				<div className='justify-between flex'>
					<Button>Save</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
