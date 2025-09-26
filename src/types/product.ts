export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    images?: string[]
    category: string
    subcategory?: string
    brand?: string
    sizes?: string[]
    colors?: string[]
    stock: number
    rating?: number
    reviewCount?: number
    featured?: boolean
    tags?: string[]
}

export interface CartItem {
    id: string
    productId: string
    name: string
    price: number
    image: string
    quantity: number
    size?: string
    color?: string
}