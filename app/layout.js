import './globals.css'

export const metadata = {
  title: 'AI Recruitment Platform',
  description: 'Hire smarter with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}