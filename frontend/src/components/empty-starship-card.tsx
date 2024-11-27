import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function EmptyStarshipCard() {
	// const navigate = useNavigate();
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>Starship Not Found</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div key='model' className='items-center space-x-2'>
					<Label>Model</Label>
					<Input disabled value={'N/A'} placeholder={`N/A`} />
				</div>
				<div key='manufacturer' className='items-center space-x-2'>
					<Label>Manufacturer</Label>
					<Input disabled value={'N/A'} placeholder={`N/A`} />
				</div>
				<div key='pilots' className='items-center space-x-2'>
					<>
						<Label>Pilots</Label>
						<Input disabled value={'N/A'} placeholder={`N/A`} />
					</>
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<div>
					<Button disabled>Delete</Button>
				</div>
				<div className='justify-between flex'>
					<Button disabled>Save</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
