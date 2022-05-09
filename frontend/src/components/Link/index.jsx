import { Link } from 'react-router-dom';

export default function CustomLink ({ children, to, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}