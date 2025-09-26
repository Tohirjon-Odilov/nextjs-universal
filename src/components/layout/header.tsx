// src/components/layout/header.tsx
import { CartSheet } from '@/components/cart/cart-sheet'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Store</h1>
                <nav className="flex items-center space-x-4">
                    <Button variant="ghost">Products</Button>
                    <Button variant="ghost">Categories</Button>
                    <CartSheet />
                </nav>
            </div>
        </header>
    )
}
