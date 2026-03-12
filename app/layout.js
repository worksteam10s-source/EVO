import '../styles/globals.css'
import '../styles/font.css'
import '../styles/theme.css'
import '../styles/animations.css'
import '../styles/carousel.css'
import '../styles/forms.css'
import '../styles/login.css'
import '@/styles/bootstrap.min.css'

export const metadata = {
  title: 'HITU - Helwan International Technical University',
  description: 'Helwan International Technical University - جامعة حلوان التكنولوجية الدولية',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* ✏️ Font import location — change the font here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Cinzel:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="cursor-glow" className="cursor-glow"></div>
        {children}
      </body>
    </html>
  )
}
