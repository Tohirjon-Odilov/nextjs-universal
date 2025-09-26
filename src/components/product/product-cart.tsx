// src/components/product/product-card.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Product {
    id: string
    name: string
    price: number
    image: string
    category: string
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="group cursor-pointer">
            <CardContent className="p-4">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                </div>
            </CardContent>
        </Card>
    )
}