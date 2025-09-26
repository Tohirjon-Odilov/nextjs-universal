export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  price: number;
  currency: string;
  category: string;
  brand?: string;
  inStock: boolean;
  createdAt: Date;
}
