import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS classlarni merge qilish uchun utility function
 * @param inputs - CSS class nomi yoki ClassValue array
 * @returns Merged CSS class string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * String'ni slug formatiga o'tkazish
 * @param text - O'tkaziladigan text
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Maxsus belgilarni olib tashlash
        .replace(/[\s_-]+/g, '-') // Space va underscore'ni dash bilan almashtirish
        .replace(/^-+|-+$/g, ''); // Boshi va oxiridagi dash'larni olib tashlash
}

/**
 * Narxni formatlash (UZS uchun)
 * @param amount - Narx
 * @param currency - Valyuta (default: UZS)
 * @returns Formatted narx string
 */
export function formatPrice(amount: number, currency: string = 'UZS'): string {
    return new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Raqamni formatlash (mingliklar bilan)
 * @param num - Formatlash kerak bo'lgan raqam
 * @returns Formatted raqam
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('uz-UZ').format(num);
}

/**
 * Sana formatini o'zgartirish
 * @param date - Sana
 * @param locale - Til (default: uz-UZ)
 * @returns Formatted sana
 */
export function formatDate(date: Date | string, locale: string = 'uz-UZ'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(dateObj);
}

/**
 * File hajmini formatlash
 * @param bytes - Byte hajmi
 * @returns Formatted file hajmi
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * URL validatsiya qilish
 * @param url - Tekshiriladigan URL
 * @returns URL valid/invalid boolean
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Email validatsiya qilish
 * @param email - Tekshiriladigan email
 * @returns Email valid/invalid boolean
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Textni truncate qilish
 * @param text - Qisqartirilishi kerak bo'lgan text
 * @param maxLength - Maksimal uzunlik
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Random ID generatsiya qilish
 * @param length - ID uzunligi (default: 8)
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Deep clone object
 * @param obj - Clone qilinadigan object
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce function
 * @param func - Debounce qilinadigan function
 * @param wait - Kutish vaqti (milliseconds)
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}