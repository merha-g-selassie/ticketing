
import Link from 'next/link';

const header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      )
    })

  // [false, false, { label: 'Sign out', href: '/auth/signout' }]
  // OR
  /*
    [
      { label: 'Sign up', href: '/auth/signup' },
      { label: 'Sign in', href: '/auth/signin' },
      false
    ]
  */

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default header;