#!/bin/bash

# 🚀 Next.js Enterprise Template Setup Script
# Bu script sizning template loyihangizni avtomatik sozlaydi

echo "🚀 Next.js Enterprise Template Setup boshlandi..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in a Next.js project
if [ ! -f "package.json" ]; then
    print_error "package.json topilmadi! Next.js loyihasida ekanligingizni tekshiring."
    exit 1
fi

# 1. Install essential packages
print_info "Essential packages o'rnatilmoqda..."
npm install lucide-react clsx tailwind-merge @headlessui/react framer-motion zustand @tanstack/react-query axios react-hook-form @hookform/resolvers zod date-fns lodash nanoid react-hot-toast next-themes

npm install -D @types/lodash prettier eslint-config-prettier

if [ $? -eq 0 ]; then
    print_success "Essential packages o'rnatildi"
else
    print_error "Packages o'rnatishda xatolik"
    exit 1
fi

# 2. Create directory structure
print_info "File struktura yaratilmoqda..."

# Main directories
mkdir -p src/{components,lib,hooks,store,types,constants}
mkdir -p src/components/{ui,forms,layout,features}
mkdir -p src/components/features/{auth,products,dashboard}
mkdir -p src/lib/{utils,api,auth,db}
mkdir -p public/{images,icons}
mkdir -p docs

# Create essential files
touch src/lib/utils/cn.ts
touch src/lib/utils/format.ts
touch src/lib/api/client.ts
touch src/types/index.ts
touch src/constants/index.ts
touch src/store/index.ts

# Create component index files
touch src/components/ui/index.ts
touch src/components/forms/index.ts
touch src/components/layout/index.ts

print_success "File struktura yaratildi"

# 3. Create utils/cn.ts file
print_info "Utils fayl yaratilmoqda..."
cat > src/lib/utils/cn.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# 4. Create basic types
print_info "Type definitions yaratilmoqda..."
cat > src/types/index.ts << 'EOF'
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
EOF

# 5. Create constants
print_info "Constants yaratilmoqda..."
cat > src/constants/index.ts << 'EOF'
export const APP_CONFIG = {
  NAME: 'Next.js Template',
  DESCRIPTION: 'Enterprise Next.js Template',
  VERSION: '1.0.0',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PROFILE: '/profile',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 10000,
} as const;
EOF

# 6. Create basic store
print_info "Zustand store yaratilmoqda..."
cat > src/store/index.ts << 'EOF'
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  isLoading: boolean;
}

interface UIStore extends UIState {
  setTheme: (theme: UIState['theme']) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'system',
        sidebarOpen: true,
        isLoading: false,

        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme }),
      }
    )
  )
);
EOF

# 7. Create component index files
print_info "Component exports yaratilmoqda..."
cat > src/components/ui/index.ts << 'EOF'
// UI components will be exported here
// export { Button } from './Button';
// export { Input } from './Input';
// export { Modal } from './Modal';
EOF

# 8. Update tsconfig.json for path aliases
print_info "TypeScript path aliases sozlanmoqda..."
if [ -f "tsconfig.json" ]; then
    # Backup original tsconfig
    cp tsconfig.json tsconfig.json.backup

    # Add path mappings (simplified approach)
    print_info "tsconfig.json'ni qo'lda tahrirlashingiz kerak bo'lishi mumkin"
fi

# 9. Create .env.example
print_info ".env.example yaratilmoqda..."
cat > .env.example << 'EOF'
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# API Keys
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Analytics
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_YM_ID=""

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
EOF

# 10. Create .gitignore additions
print_info ".gitignore yangilanmoqda..."
cat >> .gitignore << 'EOF'

# Template specific
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage
coverage/
.nyc_output/

# Dependency directories
node_modules/
.pnp/
.pnp.js

# Production builds
/build
/dist

# Cache
.turbo/
EOF

# 11. Create package.json scripts
print_info "Package.json scripts qo'shilmoqda..."
npm pkg set scripts.type-check="tsc --noEmit"
npm pkg set scripts.format="prettier --write ."
npm pkg set scripts.format:check="prettier --check ."

# 12. Success message
print_success "🎉 Template muvaffaqiyatli sozlandi!"
echo ""
print_info "Keyingi qadamlar:"
echo "1. 📝 .env.local faylini yarating va sozlang"
echo "2. 🎨 src/app/globals.css ni Tailwind CSS bilan sozlang"
echo "3. 🧩 src/components/ da komponentlaringizni yarating"
echo "4. 🗄️  Agar kerak bo'lsa, Prisma'ni sozlang"
echo "5. 🚀 npm run dev bilan development serverni ishga tushiring"
echo ""
print_warning "Eslatma: tsconfig.json path aliases'larni qo'lda tekshiring"
echo ""
print_success "Template tayyor! Happy coding! 🚀"