import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Илья — дизайнер', description: 'Портфолио Ильи: проекты, концепты, виджеты' }
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="ru"><body>{children}</body></html>) }
