import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mantle-404">
      <div className="mantle-404-code">404</div>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="mantle-btn mantle-btn-primary">
        Back to Home
      </Link>
    </div>
  )
}
