import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Starship } from '@/model/Starship';
import { ModeToggle } from './mode-toggle';


export function StarshipCard({starship}: { starship: Starship }) {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle>{starship?.name ?? 'Starship'}</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div key='model' className='items-center space-x-2'>
					<Label>Model</Label>
					<Input
						disabled
						value={starship?.model}
						// onChange={(e) => handleFieldChange(index, e.target.value)}
						placeholder={`N/A`}
					/>
				</div>
				<div key='manufacturer' className='items-center space-x-2'>
					<Label>Manufacturer</Label>
					<Input
						disabled
						value={starship?.manufacturer}
						// onChange={(e) => handleFieldChange(index, e.target.value)}
						placeholder={`N/A`}
					/>
				</div>
				<div key='pilots' className='items-center space-x-2'>
					<Label>Pilots</Label>
					{starship?.pilots.map((p) => (
						<Input
							value={p}
							disabled
							// onChange={(e) => handleFieldChange(index, e.target.value)}
							placeholder={`N/A`}
						/>
					))}
				</div>
			</CardContent>
			<CardFooter className='justify-between'>
				<div />
				<Button>Save</Button>
			</CardFooter>
		</Card>
	);
}
