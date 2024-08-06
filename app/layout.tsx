import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dream Match',
    description: 'Dream match',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Providers>
            <html lang="en">
                <body
                    className={`${inter.className} text-black bg-[url('/soccer-pattern.jpg')] bg-cover bg-center bg-repeat-y h-screen`}
                >
                    {children}
                </body>
            </html>
        </Providers>
    )
}
