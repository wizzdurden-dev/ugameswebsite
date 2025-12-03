'use client'

import { useEffect } from 'react'

// This component runs on the client to initialize theme before paint
export default function ThemeScript() {
    useEffect(() => {
        // Initialize theme: default to dark if user has not chosen
        try {
            const saved = localStorage.getItem('theme')
            if (saved === 'light') document.documentElement.classList.remove('dark')
            else document.documentElement.classList.add('dark')
        } catch (e) {
            // Fallback to dark mode
            document.documentElement.classList.add('dark')
        }
    }, [])

    return null
}
