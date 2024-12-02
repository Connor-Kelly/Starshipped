import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Starship } from '@/model/Starship';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function StarshipCard({ starship }: { starship: Starship }) {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isEdit, setIsEdit] = useState(false);
	const original = { ...starship };
	const [fields, setFields] = useState({ ...starship });
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>
					{!isEdit ? (
						<>
							{starship?.name ?? 'Starship'} : (id: {starship.id})
						</>
					) : (
						<div className='justify-between flex'>
							<div>
								<Label>Name</Label>
								<Input
									value={fields.name}
									placeholder={`N/A`}
									onChange={(val) => setFields({ ...fields, name: val.target.value })}
								/>
							</div>
							<div>
								<Label>Id</Label>
								<Input disabled value={fields.id} placeholder={`N/A`} />
							</div>
						</div>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div key='model' className='items-center space-x-2'>
					<Label>Model</Label>
					<Input
						disabled={!isEdit}
						value={fields.model}
						placeholder={`N/A`}
						onChange={(val) => setFields({ ...fields, model: val.target.value })}
					/>
				</div>
				<div key='manufacturer' className='items-center space-x-2'>
					<Label>Manufacturer</Label>
					<Input
						disabled={!isEdit}
						value={fields.manufacturer}
						placeholder={`N/A`}
						onChange={(val) => setFields({ ...fields, manufacturer: val.target.value })}
					/>
				</div>
				<div key='pilots' className='items-center space-x-2'>
					<>
						<Label>Pilots</Label>
						{fields.pilots.length > 0 ? (
							fields.pilots.map((p) => <Input value={p} disabled={!isEdit} placeholder={`N/A`} />)
						) : (
							<Input
								value={'No Pilots Fly this ship.'}
								disabled={!isEdit}
								placeholder={`N/A`}
								// onChange={(val) => console.log(val)
								onChange={(val) => setFields({ ...fields, model: val.target.value })}
								// }
							/>
						)}
					</>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<div></div>
				<div className='justify-between flex'>
					{!isEdit ? (
						<Button
							onClick={() => {
								setIsEdit(true);
							}}
						>
							Edit
						</Button>
					) : (
						<div className='justify-between flex'>
							<Button
								onClick={() => {
									setIsEdit(false);
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={() =>
									axios.delete(`http://localhost:5119/${starship.id}`).then(() => {
										toast({ description: 'Starship Deleted' });
										navigate('/');
										location.reload();
									})
								}
							>
								Delete
							</Button>
							<Button
								onClick={() => {
									setIsEdit(false);
									axios.post(`http://localhost:5119/${starship.id}`, fields).then((response) => {
										toast({ description: 'Starship updated' });
									});
								}}
							>
								Save
							</Button>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
