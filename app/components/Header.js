import Link from 'next/link'

export default function Header() {
  return (
    <header className="main-header">
      <img src="/Pics/logo.png" alt="EVO" />
      <h1>Landing Page</h1>
      <img src="/Pics/HITU.png" alt="HITU" />
      
      <nav className="header-nav">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/student-page">Student Page</Link>
        <Link href="/news">News</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/library">Library</Link>
        <Link href="/documents">Documents</Link>
      </nav>
    </header>
  )
}
