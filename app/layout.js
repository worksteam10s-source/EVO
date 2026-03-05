import '../styles/globals.css'
import '../styles/theme.css'
import '../styles/animations.css'
import '../styles/carousel.css'
import '../styles/forms.css'
import '../styles/login.css'

export const metadata = {
  title: 'HITU - Helwan International Technical University',
  description: 'Helwan International Technical University - جامعة حلوان التكنولوجية الدولية',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div id="cursor-glow" className="cursor-glow"></div>
        {children}
      </body>
    </html>
  )
}
