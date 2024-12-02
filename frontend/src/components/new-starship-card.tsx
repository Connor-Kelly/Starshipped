import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function NewStarshipCard() {
	const navigate = useNavigate();
	const [fields, setFields] = useState({
		name: '',
		id: (Math.random() * 1000).toFixed(0),
		model: '',
		manufacturer: '',
	});
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>
					<div className='justify-between flex'>
						<div>
							<Label>Name</Label>
							<Input
								value={fields.name}
								required
								placeholder={`name`}
								onChange={(val) => setFields({ ...fields, name: val.target.value })}
							/>
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div key='model' className='items-center space-x-2'>
					<Label>Model</Label>
					<Input
						value={fields.model}
						placeholder={`model`}
						required
						onChange={(val) => setFields({ ...fields, model: val.target.value })}
					/>
				</div>
				<div key='manufacturer' className='items-center space-x-2'>
					<Label>Manufacturer</Label>
					<Input
						value={fields.manufacturer}
						placeholder={`manufacturer`}
						required
						onChange={(val) => setFields({ ...fields, manufacturer: val.target.value })}
					/>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<div></div>
				<div className='justify-between flex space-x-2'>
					<Button
						className='rounded'
						onClick={() => {
							navigate('/');
						}}
					>
						Cancel
					</Button>
					<Button
						className='rounded'
						onClick={() => {
							axios.put(`http://localhost:5119/${fields.id}`, fields).then((response) => {
								alert('Starship updated');
								navigate(`/${response.data}`);
							});
						}}
					>
						Save
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
