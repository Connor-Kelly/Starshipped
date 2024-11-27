
import { Button } from '@/components/ui/button'
import { ModeToggle } from './mode-toggle'

export function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-background border-b">
            {/* <Link href="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6" /> */}
                <span className="text-xl font-semibold">Starshipped</span>
            {/* </Link> */}
            <div className="flex items-center space-x-4">
                <ModeToggle />
            </div>
        </nav>
    )
}