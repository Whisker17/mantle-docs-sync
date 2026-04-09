import Link from 'next/link'

/* =============================================
   Mantle Logo — SVG with gradient, light/dark
   ============================================= */
export function MantleLogo() {
  return (
    <span className="mantle-logo">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mantle-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7ECEC9" />
            <stop offset="1" stopColor="#4A9A95" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#mantle-grad)" />
        <path
          d="M8 22V12l4 6 4-6v10M20 12h4l-4 10h4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mantle-logo-text">Mantle</span>
    </span>
  )
}


/* =============================================
   Hero — left-aligned with CTA buttons
   ============================================= */
export function Hero({ title, subtitle, children }) {
  return (
    <div className="mantle-hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {children && <div className="mantle-hero-cta">{children}</div>}
    </div>
  )
}


/* =============================================
   CTA Button — Primary & Secondary variants
   ============================================= */
export function CTAButton({ href, variant = 'primary', children, external }) {
  const className = `mantle-btn mantle-btn-${variant}`
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (href) {
    return (
      <Link href={href} className={className} {...externalProps}>
        {children}
        {external && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
          </svg>
        )}
      </Link>
    )
  }

  return <span className={className}>{children}</span>
}


/* =============================================
   Section Title — uppercase label
   ============================================= */
export function SectionTitle({ children }) {
  return <div className="mantle-section-title">{children}</div>
}


/* =============================================
   CardGrid — simple responsive 3-col grid
   ============================================= */
export function CardGrid({ cols, children }) {
  const style = cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined
  return (
    <div className="mantle-card-grid" style={style}>
      {children}
    </div>
  )
}


/* =============================================
   HomeCard — simple icon + title + desc card
   ============================================= */
export function HomeCard({ href, icon, title, description }) {
  return (
    <Link href={href} className="mantle-card">
      {icon && <div className="mantle-card-icon">{icon}</div>}
      <div className="mantle-card-title">
        <span>{title}</span>
        <span className="mantle-card-arrow">&rarr;</span>
      </div>
      <div className="mantle-card-description">{description}</div>
    </Link>
  )
}


/* =============================================
   NavigationCard — Optimism HomeCard pattern
   Outer container with title + list of items
   ============================================= */
export function NavigationCard({ icon, title, footerLink, footerText, children }) {
  return (
    <div className="mantle-nav-card">
      <div className="mantle-nav-card-header">
        {icon && <span className="mantle-nav-card-icon">{icon}</span>}
        <span className="mantle-nav-card-title">{title}</span>
      </div>
      <div className="mantle-nav-card-list">
        {children}
      </div>
      {footerLink && (
        <div className="mantle-nav-card-footer">
          <Link href={footerLink}>
            {footerText || 'View all'} <span>&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  )
}


/* =============================================
   NavigationCardItem — inner list item
   [Number] [Content: Title + Badge + Desc] [Arrow]
   ============================================= */
export function NavigationCardItem({ href, number, title, description, badge }) {
  const Tag = href ? Link : 'div'
  const linkProps = href ? { href } : {}

  return (
    <Tag className="mantle-nav-card-item" {...linkProps}>
      {number != null && (
        <span className="mantle-nav-item-number">{number}</span>
      )}
      <div className="mantle-nav-item-content">
        <div className="mantle-nav-item-header">
          <span className="mantle-nav-item-title">{title}</span>
          {badge && <DifficultyBadge level={badge} />}
        </div>
        {description && (
          <div className="mantle-nav-item-desc">{description}</div>
        )}
      </div>
      <span className="mantle-nav-item-arrow">&rarr;</span>
    </Tag>
  )
}


/* =============================================
   DifficultyBadge — Easy / Medium / Hard pill
   ============================================= */
export function DifficultyBadge({ level }) {
  const normalized = (level || '').toLowerCase()
  const classMap = {
    easy: 'mantle-badge-easy',
    medium: 'mantle-badge-medium',
    hard: 'mantle-badge-hard',
    new: 'mantle-badge-new',
  }
  const className = classMap[normalized] || 'mantle-badge-easy'

  return (
    <span className={`mantle-badge ${className}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}


/* =============================================
   Expandable — Collapsible accordion
   ============================================= */
export function Expandable({ title, children, defaultOpen = false }) {
  return (
    <details className="mantle-expandable" open={defaultOpen || undefined}>
      <summary className="mantle-expandable-trigger">
        <span>{title}</span>
        <span className="mantle-expandable-chevron">&#9660;</span>
      </summary>
      <div className="mantle-expandable-content">
        {children}
      </div>
    </details>
  )
}


/* =============================================
   NavGrid — 2-column grid for NavigationCards
   ============================================= */
export function NavGrid({ children }) {
  return <div className="mantle-nav-grid">{children}</div>
}
